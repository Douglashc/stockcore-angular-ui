import { BuyResponseInterface } from "../../interfaces/buy/buy-response.interface";

export const BuysAllData: BuyResponseInterface[] = [
    {
        id: 2,
        date: '2026-05-30T14:32:51.537972',
        supplierId: 1,
        supplierName: 'Gustavo Lara Pinto',
        total: 400,
        userId: 1,
        details: [
            { id: 2, buyId: 2, productId: 1, productName: 'Lavandina para piso', quantity: 40, unitCost: 10, loteId: 1, loteCode: 'COD-0001' }
        ]
    },
    {
        id: 3,
        date: '2026-05-30T14:40:12.01794',
        supplierId: 1,
        supplierName: 'Gustavo Lara Pinto',
        total: 500,
        userId: 1,
        details: [
            { id: 3, buyId: 3, productId: 1, productName: 'Lavandina para piso', quantity: 50, unitCost: 10, loteId: 1, loteCode: 'COD-0001' }
        ]
    }
];