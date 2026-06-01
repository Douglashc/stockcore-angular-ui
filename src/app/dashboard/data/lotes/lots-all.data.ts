import { LoteResponseInterface } from "../../interfaces/lote/lote-response.interface";

export const LotsAllData: LoteResponseInterface[] = [
    { id: 1, code: 'COD-0001', purchaseDate: '2026-05-30T13:45:47.941', expirationDate: '2026-08-30T13:45:47.941', cost: 480, productId: 1, productName: 'Lavandina para piso' },
    { id: 2, code: 'COD-0002', purchaseDate: '2026-05-20T10:00:00', expirationDate: '2026-06-15T00:00:00', cost: 1200, productId: 5, productName: 'Jabon OMO' },
    { id: 3, code: 'COD-0003', purchaseDate: '2026-04-01T09:15:00', expirationDate: '2026-05-25T00:00:00', cost: 350, productId: 4, productName: 'Guantes de Nitrilo' } // Ya vencido
]; 