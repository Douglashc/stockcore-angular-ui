import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UserFormComponent } from '../../components/users/user-form/user-form.component';
import { UserResponseInterface } from '../../interfaces/user/user-response.interface';
import { UsersAllData } from '../../data/users/users-all.data';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  public usuarios = signal<UserResponseInterface[]>(UsersAllData);

  public searchedUsuarios = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.usuarios();
    return this.usuarios().filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.userName.toLowerCase().includes(term) ||
      u.ci.includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedUsuarios().length / this.itemsPerPage()) || 1;
  });

  public pagedUsuarios = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedUsuarios().slice(startIndex, endIndex);
  });

  public totalUsersCount = computed(() => this.usuarios().length);

  toggleUserActive(userId: number): void {
    this.usuarios.update(list =>
      list.map(u => u.id === userId ? { ...u, active: !u.active } : u)
    );

    const userUpdated = this.usuarios().find(u => u.id === userId);
    console.log(`Petición PATCH enviada a .NET Core -> Usuario: ${userUpdated?.userName}, Activo: ${userUpdated?.active}`);
    // Aquí invocarías a tu usuarioService.updateStatus(userId, userUpdated.active)
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(userId: number | null = null): void {
    this.#dialogService.open(UserFormComponent, {
      width: '600px',
      data: { userId }
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Refrescando listado maestro de operadores logísticos, bro ggg');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
