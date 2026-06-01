import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { BuyResponseInterface } from '../../interfaces/buy/buy-response.interface';
import { BuyFormComponent } from '../../components/buys/buy-form/buy-form.component';
import { BuysAllData } from '../../data/buys/buys-all.data';

@Component({
  selector: 'app-buys-page',
  templateUrl: './buys-page.component.html',
  styleUrls: ['./buys-page.component.scss']
})
export class BuysPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  public buys = signal<BuyResponseInterface[]>(BuysAllData);

  public searchedBuys = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.buys();
    return this.buys().filter(b =>
      b.supplierName.toLowerCase().includes(term) || b.id.toString() === term
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedBuys().length / this.itemsPerPage()) || 1;
  });

  public pagedBuys = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedBuys().slice(startIndex, endIndex);
  });

  public totalBuysCount = computed(() => this.buys().length);

  toggleExpandRow(buyId: number): void {
    this.buys.update(list =>
      list.map(b => b.id === buyId ? { ...b, isExpanded: !b.isExpanded } : b)
    );
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(): void {
    this.#dialogService.open(BuyFormComponent, {
      width: '950px' 
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Recargando libro de transacciones de compra de OmniLink...');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
