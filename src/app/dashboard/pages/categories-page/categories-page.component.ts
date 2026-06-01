import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DialogService } from 'src/app/shared/services/dialog.service';
import { CategoryFormComponent } from '../../components/categories/category-form/category-form.component';
import { CategoryResponse } from '../../interfaces/category/category-response.interface';
import { CategoriesAllData } from '../../data/categories/categories-all.data';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  public categories = signal<CategoryResponse[]>(CategoriesAllData);

  public totalCategoriesCount = computed(() => this.categories().length);

  public searchedCategories = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.categories();
    return this.categories().filter(c => 
      c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedCategories().length / this.itemsPerPage()) || 1;
  });

  public pagedCategories = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedCategories().slice(startIndex, endIndex);
  });

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(categoryId: number | null = null): void {
    this.#dialogService.open(CategoryFormComponent, {
      width: '500px',
      data: { categoryId }
    })
    .afterClosed()
    .pipe(takeUntil(this.#destroy$))
    .subscribe(result => {
      if (result === 'REFRESH') {
        console.log('Recargando categorías desde la API de .NET, bro!');
      }
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
