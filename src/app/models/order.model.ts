import { Client } from './client.model'; 
import { OrderItem } from './orderItem.model';

export interface Order {
  orderId: number;
  clientId: number;
  orderDate?: string;
  totalAmount: number;
  client: Client; 
  orderItems?: OrderItem[]; 
}
