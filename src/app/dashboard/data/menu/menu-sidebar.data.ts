import { MenuGroup } from "../../interfaces/menu/menu-group.interface";

export const menuSidebarData: MenuGroup[] = [
    {
        items: [
            { title: 'Dashboard', icon: 'dashboard', route: '/dashboard/summary' }
        ]
    },
    {
        groupTitle: 'Logística y Catálogos',
        items: [
            { title: 'Productos', icon: 'store', route: '/dashboard/products' },
            { title: 'Categorías', icon: 'category', route: '/dashboard/categories' },
            { title: 'Control de Lotes', icon: 'layers', route: '/dashboard/lots' }
        ]
    },
    {
        groupTitle: 'Operaciones',
        items: [
            { title: 'Movimientos Stock', icon: 'swap_horiz', route: '/dashboard/movimientos' },
            { title: 'Compras / Entradas', icon: 'shopping_cart', route: '/dashboard/buys' },
            { title: 'Ventas / Salidas', icon: 'point_of_sale', route: '/dashboard/ventas' }
        ]
    },
    {
        groupTitle: 'Contactos',
        items: [
            { title: 'Proveedores', icon: 'storefront', route: '/dashboard/suppliers' },
            { title: 'Clientes', icon: 'people', route: '/dashboard/clients' }
        ]
    },
    {
        groupTitle: 'Sistema',
        items: [
            { title: 'Sucursales', icon: 'business', route: '/dashboard/branches' },
            { title: 'Usuarios y Roles', icon: 'manage_accounts', route: '/dashboard/users' }
        ]
    }
];