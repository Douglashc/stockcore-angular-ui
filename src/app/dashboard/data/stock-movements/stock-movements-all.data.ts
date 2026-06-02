import { StockMovementResponseInterface } from "../../interfaces/stock-movement/stock-movement-response.Interface";

export const StockMovementsAllData: StockMovementResponseInterface[] = [
    { id: 101, type: 'INGRESO', productId: 1, productName: 'Lavandina para piso', loteId: 1, loteCode: 'COD-0001', branchId: 1, branchName: 'Sucursal mundo compra', quantity: 20, date: '2026-06-01T10:00:00', observation: 'Ajuste inicial', userId: 1 },
    { id: 102, type: 'EGRESO', productId: 4, productName: 'Guantes de Nitrilo', loteId: 2, loteCode: 'LOT-0002', branchId: 2, branchName: 'Sucursal dulce venta', quantity: 5, date: '2026-06-02T15:30:00', observation: 'Producto dañado', userId: 1 }
]; 