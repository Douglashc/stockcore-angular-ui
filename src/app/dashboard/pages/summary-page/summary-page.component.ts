import { Component, signal, computed } from '@angular/core';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';

import { RecentMovement } from '../../interfaces/summary/recent-movement';

Chart.register(...registerables);
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
  public chartType: ChartType = 'line';

  public netBalance = computed(() => this.totalSales() - this.totalBuys());

  public chartData: ChartConfiguration['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [15000, 22000, 18000, 31000, 29000, this.totalSales()], 
        label: 'Ventas Totales',
        backgroundColor: 'rgba(99, 102, 241, 0.08)', 
        borderColor: '#6366f1', 
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        fill: 'origin',
        tension: 0.4
      },
      {
        data: [9000, 14000, 11000, 15000, 13000, this.totalBuys()],
        label: 'Inversión Compras',
        backgroundColor: 'rgba(20, 184, 166, 0.04)', 
        borderColor: '#14b8a6',
        pointBackgroundColor: '#14b8a6',
        pointBorderColor: '#fff',
        fill: 'origin',
        tension: 0.4
      }
    ]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#94a3b8',
          font: { family: 'sans-serif', size: 11, weight: 500 }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a', 
        titleColor: '#fff',
        bodyColor: '#94a3b8',
        borderColor: '#334155',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { display: false }, 
        ticks: { color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(51, 65, 85, 0.25)' }, 
        ticks: {
          color: '#64748b',
          callback: (value) => '$' + Number(value).toLocaleString() 
        }
      }
    }
  };

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
