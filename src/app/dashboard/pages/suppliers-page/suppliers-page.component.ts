import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SupplierFormComponent } from '../../components/suppliers/supplier-form/supplier-form.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SupplierResponseInterface } from '../../interfaces/supplier/supplier-response.interface';
import { SuppliersAllData } from '../../data/suppliers/supliers-all.data';

@Component({
  selector: 'app-suppliers-page',
  templateUrl: './suppliers-page.component.html',
  styleUrls: ['./suppliers-page.component.scss']
})
export class SuppliersPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  public suppliers = signal<SupplierResponseInterface[]>(SuppliersAllData);

  public searchedSuppliers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.suppliers();
    return this.suppliers().filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.nit.includes(term) ||
      s.phoneNumber.includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedSuppliers().length / this.itemsPerPage()) || 1;
  });

  public pagedSuppliers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedSuppliers().slice(startIndex, endIndex);
  });

  public totalSuppliersCount = computed(() => this.suppliers().length);

  toggleSupplierActive(supplierId: number): void {
    this.suppliers.update(list =>
      list.map(s => s.id === supplierId ? { ...s, active: !s.active } : s)
    );

    const supplierUpdated = this.suppliers().find(s => s.id === supplierId);
    console.log(`Petición PATCH enviada a .NET Core -> Supplier: ${supplierUpdated?.name}, Active: ${supplierUpdated?.active}`);

  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(supplierId: number | null = null): void {
    this.#dialogService.open(SupplierFormComponent, {
      width: '580px',
      data: { supplierId }
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Recargando catálogo de suppliers de OmniLink, bro ggg');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
