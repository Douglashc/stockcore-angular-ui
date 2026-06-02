import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SaleFormComponent } from '../../components/sales/sale-form/sale-form.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SaleResponseInterface } from '../../interfaces/sale/sale-response.interface';
import { SalesAllData } from '../../data/sales/sales-all.data';

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  public sales = signal<SaleResponseInterface[]>(SalesAllData);

  public searchedSales = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.sales();
    return this.sales().filter(s =>
      s.clientName.toLowerCase().includes(term) || s.branchName.toLowerCase().includes(term) || s.id.toString() === term
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedSales().length / this.itemsPerPage()) || 1;
  });

  public pagedSales = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedSales().slice(startIndex, endIndex);
  });

  public totalSalesCount = computed(() => this.sales().length);

  toggleExpandRow(saleId: number): void {
    this.sales.update(list =>
      list.map(s => s.id === saleId ? { ...s, isExpanded: !s.isExpanded } : s)
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
    this.#dialogService.open(SaleFormComponent, {
      width: '950px'
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Recargando histórico de facturación en OmniLink...');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
