import { CategoryResponse } from "../../interfaces/category/category-response.interface";

export const CategoriesAllData: CategoryResponse[] = [
    { id: 1, name: 'Limpieza', active: true, description: 'Categoría de limpieza para el hogar y almacenes.' },
    { id: 2, name: 'Herramientas', active: true, description: 'Herramientas pesadas y destornilladores imantados.' },
    { id: 3, name: 'Seguridad', active: true, description: 'Equipo de protección personal y guantes de nitrilo.' },
    { id: 4, name: 'Alimentos', active: false, description: 'Insumos perecederos y control estricto de mermas.' }
];