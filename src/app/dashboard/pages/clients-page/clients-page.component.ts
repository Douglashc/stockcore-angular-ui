import { Component, computed, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ClientFormComponent } from '../../components/clients/client-form/client-form.component';
import { ClientResponseInterface } from '../../interfaces/client/client-response.interface';
import { ClientsAllData } from '../../data/clients/clients-all.data';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  // Lista con tipado correcto en inglés
  public clients = signal<ClientResponseInterface[]>(ClientsAllData);

  // Buscador reactivo cruzado utilizando la nomenclatura correcta
  public searchedClients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.clients();
    return this.clients().filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.ci.includes(term) ||
      (c.nit && c.nit.includes(term))
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedClients().length / this.itemsPerPage()) || 1;
  });

  public pagedClients = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedClients().slice(startIndex, endIndex);
  });

  public totalClientsCount = computed(() => this.clients().length);

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(clientId: number | null = null): void {
    this.#dialogService.open(ClientFormComponent, {
      width: '520px',
      data: { clientId }
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Recargando clients activos de la API de .NET Core, bro!');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
