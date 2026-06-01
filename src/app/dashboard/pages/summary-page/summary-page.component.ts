import { Component, signal, computed } from '@angular/core';
import { RecentMovement } from '../../interfaces/summary/recent-movement';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent {

  public totalSales = signal<number>(45231.89);
  public totalBuys = signal<number>(12480.00); 
  public criticalStockCount = signal<number>(8); 
  public activeSuppliersCount = signal<number>(24); 

  public netBalance = computed(() => this.totalSales() - this.totalBuys());

  public recentMovements = signal<RecentMovement[]>([
    {
      type: 'ingreso',
      title: 'Ingreso por Compra',
      subtitle: 'Lote: LOT-2026',
      amount: '+150 u',
      icon: 'add_circle_outline',
      colorClass: 'text-emerald-500'
    },
    {
      type: 'salida',
      title: 'Salida por Venta',
      subtitle: 'Sucursal Norte',
      amount: '-12 u',
      icon: 'remove_circle_outline',
      colorClass: 'text-rose-500'
    },
    {
      type: 'ajuste',
      title: 'Ajuste de Inventario',
      subtitle: 'Merma detectada',
      amount: '-3 u',
      icon: 'info',
      colorClass: 'text-amber-500'
    }
  ]);

}
