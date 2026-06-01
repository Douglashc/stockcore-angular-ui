import { Component, computed, inject, signal, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { BranchFormComponent } from '../../components/branches/branch-form/branch-form.component';
import { BranchResponseInterface } from '../../interfaces/branch/branch-response.interface';
import { BranchesAllData } from '../../data/branches/branches-all.data';

@Component({
  selector: 'app-branches-page',
  templateUrl: './branches-page.component.html',
  styleUrls: ['./branches-page.component.scss']
})
export class BranchesPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(3); 

  public branches = signal<BranchResponseInterface[]>(BranchesAllData);

  public totalBranchesCount = computed(() => this.branches().length);
  public activeBranchesCount = computed(() => this.branches().filter(b => b.active).length);
  public inactiveBranchesCount = computed(() => this.branches().filter(b => !b.active).length);

  public searchedBranches = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.branches();
    return this.branches().filter(b =>
      b.name.toLowerCase().includes(term) || b.direction.toLowerCase().includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedBranches().length / this.itemsPerPage()) || 1;
  });

  public pagedBranches = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedBranches().slice(startIndex, endIndex);
  });

  toggleBranchStatus(branchId: number): void {
    this.branches.update(list =>
      list.map(b => b.id === branchId ? { ...b, active: !b.active } : b)
    );
    console.log(`Estado cambiado para Sucursal ID: ${branchId}`);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(branchId: number | null = null): void {
    this.#dialogService.open(BranchFormComponent, {
      width: '520px',
      data: { branchId }
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Recargando branches desde .NET Core...');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
