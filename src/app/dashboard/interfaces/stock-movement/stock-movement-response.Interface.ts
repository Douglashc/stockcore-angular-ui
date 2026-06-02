export interface StockMovementResponseInterface {
  id: number;
  type: string;
  productId: number;
  productName: string;
  loteId: number;
  loteCode: string;
  branchId: number;
  branchName: string;
  quantity: number;
  date: string;
  observation: string | null;
  userId: number;
}