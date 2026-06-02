import { InventoryResponseInterface } from "../../interfaces/inventary/inventary-response.interface";

export const InventariesAllData: InventoryResponseInterface[] = [
    {
        id: 2,
        productId: 1,
        productName: 'Lavandina para piso',
        categoryName: 'Limpieza',
        loteId: 1,
        loteCode: 'COD-0001',
        branchId: 1,
        branchName: 'Sucursal mundo compra',
        quantity: 80
    },
    {
        id: 3,
        productId: 4,
        productName: 'Guantes de Nitrilo',
        categoryName: 'Seguridad',
        loteId: 2,
        loteCode: 'LOT-0002',
        branchId: 2,
        branchName: 'Sucursal dulce venta',
        quantity: 15
    }
];