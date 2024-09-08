import { OrderItem } from "./orderItem.model";

export interface CreateOrderRequest {
    clientId: number;
    totalAmount: number;
    orderItems: OrderItem[];
}