import { Order } from './order.model'; 
import { Product } from './product.model'; 

export interface OrderItem {
  orderItemId?: number;
  orderId?: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  order?: Order;
  product?: Product; 
}