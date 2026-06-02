import { SaleResponseInterface } from "../../interfaces/sale/sale-response.interface";

export const SalesAllData: SaleResponseInterface[] = [
    {
        id: 1,
        date: '2026-06-02T00:03:58.793',
        clientId: 1,
        clientName: 'Maria Lorena Lima Perez',
        branchId: 1,
        branchName: 'Sucursal mundo compra',
        total: 150,
        userId: 1,
        details: [
            { id: 1, saleId: 1, productId: 1, productName: 'Lavandina para piso', quantity: 10, unitPrice: 15, loteId: 1, loteCode: 'COD-0001' }
        ]
    }
];