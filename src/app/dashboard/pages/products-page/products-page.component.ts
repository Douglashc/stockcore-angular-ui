import { Component, computed, signal, inject, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DialogService } from 'src/app/shared/services/dialog.service';
import { ProductResponse } from '../../interfaces/product/product-response.interface';
import { productsData } from '../../data/products/products-all.data';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnDestroy {

  public searchTerm = signal<string>('');

  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(4);

  public products = signal<ProductResponse[]>(productsData);

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();


  public totalProductsCount = computed(() => this.products().length);

  public searchedProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.products();
    return this.products().filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.code.toLowerCase().includes(term) ||
      p.categoryName.toLowerCase().includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedProducts().length / this.itemsPerPage()) || 1;
  });

  public pagedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedProducts().slice(startIndex, endIndex);
  });

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1); 
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(productId: number | null = null): void {
    this.#dialogService.open(ProductFormComponent, {
      width: '600px',
      data: { productId }
    })
    .afterClosed() 
    .pipe(takeUntil(this.#destroy$))
    .subscribe(result => {
      if (result === 'REFRESH') {
        console.log('¡Se guardó! Recargando tabla desde la API...');
        // this.loadProductsFromBackend();
      }
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
