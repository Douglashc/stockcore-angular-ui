import { BuyDetailInterface } from "./buy-detail.interface";

export interface BuyResponseInterface {
  id: number;
  date: string;
  supplierId: number;
  supplierName: string;
  total: number;
  userId: number;
  details: BuyDetailInterface[];
  isExpanded?: boolean; // UI local flag para expandir detalles
}