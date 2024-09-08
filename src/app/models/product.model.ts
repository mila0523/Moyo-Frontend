
export interface Product {
  productId: number;
  productName: string;
  description?: string;
  price: number;
  stockQuantity?: number;
  dateCreated?: Date;
}
