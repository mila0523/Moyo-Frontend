import { Order } from "./order.model";

export interface Client {
    clientId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    dateCreated?: Date;
    orders?: Order[];
  }
  