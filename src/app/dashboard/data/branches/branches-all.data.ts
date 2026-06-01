import { BranchResponseInterface } from "../../interfaces/branch/branch-response.interface";

export const BranchesAllData: BranchResponseInterface[] = [
    { id: 1, name: 'Sucursal mundo compra', direction: 'Calle America #123, Central', phoneNumber: '74851254', active: true },
    { id: 2, name: 'Sucursal dulce venta', direction: 'Av. Siempre Viva #742', phoneNumber: '71124578', active: true },
    { id: 3, name: 'Sucursal Almacén Norte', direction: 'Zona Industrial Km 5', phoneNumber: '78841255', active: true },
    { id: 4, name: 'Sucursal Frontera Este', direction: 'Av. Internacional S/N', phoneNumber: '64581200', active: true },
    { id: 5, name: 'Sucursal Punto Oeste', direction: 'Calle Los Pinos #456', phoneNumber: '60012488', active: false } // Inactiva
];