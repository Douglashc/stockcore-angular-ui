export interface ProductResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  salePrice: number;
  active: boolean;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  handlesBatches: boolean;
  userId: number;
}