import { Component, computed, OnInit, signal } from '@angular/core';
import { InventoryResponseInterface } from '../../interfaces/inventary/inventary-response.interface';
import { InventariesAllData } from '../../data/inventaries/inventaries-all.data';

@Component({
  selector: 'app-inventaries-page',
  templateUrl: './inventaries-page.component.html',
  styleUrls: ['./inventaries-page.component.scss']
})
export class InventariesPageComponent implements OnInit {

  public branchesList = signal([{ id: 1, name: 'Sucursal mundo compra' }, { id: 2, name: 'Sucursal dulce venta' }]);
  public productsList = signal([{ id: 1, name: 'Lavandina para piso' }, { id: 4, name: 'Guantes de Nitrilo' }]);

  public selectedBranchId = signal<number | null>(null);
  public selectedProductId = signal<number | null>(null);
  public searchTerm = signal<string>('');

  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5); 

  public inventoryItems = signal<InventoryResponseInterface[]>(InventariesAllData);

  public filteredInventory = computed(() => {
    let items = this.inventoryItems();
    const branchFilter = this.selectedBranchId();
    const productFilter = this.selectedProductId();
    const term = this.searchTerm().toLowerCase().trim();

    if (branchFilter) items = items.filter(i => i.branchId === branchFilter);
    if (productFilter) items = items.filter(i => i.productId === productFilter);
    if (term) {
      items = items.filter(i =>
        i.productName.toLowerCase().includes(term) ||
        i.loteCode.toLowerCase().includes(term) ||
        i.categoryName.toLowerCase().includes(term)
      );
    }
    return items;
  });

  public totalPages = computed(() => {
    return Math.ceil(this.filteredInventory().length / this.itemsPerPage()) || 1;
  });

  public pagedInventory = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.filteredInventory().slice(startIndex, endIndex);
  });

  public totalStockPhysical = computed(() => this.filteredInventory().reduce((acc, curr) => acc + curr.quantity, 0));
  public lowStockAlertCount = computed(() => this.filteredInventory().filter(i => i.quantity <= 20).length);

  ngOnInit(): void {
    this.loadAllInventory();
  }

  public loadAllInventory(): void {
    console.log('GET de todo el inventario');
  }

  public onBranchFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedBranchId.set(value === 'null' ? null : Number(value));
    this.currentPage.set(1);
  }

  public onProductFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedProductId.set(value === 'null' ? null : Number(value));
    this.currentPage.set(1); 
  }

  public onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  public resetFilters(): void {
    this.selectedBranchId.set(null);
    this.selectedProductId.set(null);
    this.searchTerm.set('');
    this.currentPage.set(1);
    this.loadAllInventory();
  }

}
