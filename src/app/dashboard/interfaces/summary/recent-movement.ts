export interface RecentMovement {
  type: 'ingreso' | 'salida' | 'ajuste';
  title: string;
  subtitle: string;
  amount: string;
  icon: string;
  colorClass: string;
}