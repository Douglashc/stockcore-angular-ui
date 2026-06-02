import { SaleDetailInterface } from "./sale-detail-response.interface";

export interface SaleResponseInterface {
  id: number;
  date: string;
  clientId: number;
  clientName: string;
  branchId: number;
  branchName: string;
  total: number;
  userId: number;
  details: SaleDetailInterface[];
  isExpanded?: boolean; // UI local collapse
}