import { ProductResponse } from "../../interfaces/product/product-response.interface";

export const productsData: ProductResponse[] = [
    {
        id: 1,
        code: 'LI-001',
        name: 'Lavandina para Piso',
        description: 'Lavandina especializada para pisos de porcelanato y cerámica.',
        salePrice: 12.50,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60',
        categoryId: 1,
        categoryName: 'Limpieza',
        handlesBatches: true,
        userId: 1
    },
    {
        id: 2,
        code: 'HE-042',
        name: 'Destornillador Phillips',
        description: 'Destornillador imantado con mango ergonómico antideslizante.',
        salePrice: 35.00,
        active: true,
        imageUrl: 'https://www.dateriumsystem.com/appfiles/clientes/308/catalogo/119529.jpg',
        categoryId: 2,
        categoryName: 'Herramientas',
        handlesBatches: false,
        userId: 1
    },
    {
        id: 3,
        code: 'LI-008',
        name: 'Detergente Líquido',
        description: 'Detergente concentrado para ropa blanca y de color.',
        salePrice: 22.00,
        active: false,
        imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=150&auto=format&fit=crop&q=60',
        categoryId: 1,
        categoryName: 'Limpieza',
        handlesBatches: true,
        userId: 1
    },
    {
        id: 4,
        code: 'SE-105',
        name: 'Guantes de Nitrilo',
        description: 'Caja de 100 unidades, guantes descartables de alta resistencia.',
        salePrice: 65.50,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60',
        categoryId: 3,
        categoryName: 'Seguridad',
        handlesBatches: true,
        userId: 1
    },
    {
        id: 5,
        code: 'AP-105',
        name: 'Jabon OMO',
        description: 'Jabon OMO para ropa blanca y fragil.',
        salePrice: 12.00,
        active: true,
        imageUrl: 'https://a-static.mlcdn.com.br/800x600/sabao-em-po-omo-branco-absoluto-expert-720g/magazineluiza/238426400/021c5b596b28e1ee7efd4d5c80da1a1b.jpg',
        categoryId: 1,
        categoryName: 'Limpieza',
        handlesBatches: true,
        userId: 1
    }
];

