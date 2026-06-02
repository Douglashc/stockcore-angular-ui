import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { StockMovementFormComponent } from '../../components/stock-movements/stock-movement-form/stock-movement-form.component';
import { StockMovementResponseInterface } from '../../interfaces/stock-movement/stock-movement-response.Interface';
import { StockMovementsAllData } from '../../data/stock-movements/stock-movements-all.data';

@Component({
  selector: 'app-stock-movements-page',
  templateUrl: './stock-movements-page.component.html',
  styleUrls: ['./stock-movements-page.component.scss']
})
export class StockMovementsPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(8);

  public movements = signal<StockMovementResponseInterface[]>(StockMovementsAllData);

  public searchedMovements = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.movements();
    return this.movements().filter(m =>
      m.productName.toLowerCase().includes(term) || m.loteCode.toLowerCase().includes(term) || m.type.toLowerCase().includes(term)
    );
  });

  public totalPages = computed(() => Math.ceil(this.searchedMovements().length / this.itemsPerPage()) || 1);
  public pagedMovements = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.searchedMovements().slice(start, start + this.itemsPerPage());
  });

  public totalMovementsCount = computed(() => this.movements().length);

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(): void {
    this.#dialogService.open(StockMovementFormComponent, { width: '600px' })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(res => { if (res === 'REFRESH') console.log('Update moves ggg'); });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
