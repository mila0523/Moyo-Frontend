import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDataService } from '../services/orderData.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import { AuthDataService } from '../services/auth.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  products: Product[] = [];

  constructor(private orderDataSevice: OrderDataService, authDataService: AuthDataService) { }

  loading: boolean = false;

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchOrders();  
  }

  fetchOrders(){
    this.loading = true;

    //feth orders only for the user thats logged in
    const client =  localStorage.getItem('clientId')
    var intClientId = 0;
    if(client){
      intClientId = parseInt(client);
    }  

    this.orderDataSevice.getOrders(intClientId).subscribe((order: any)=>{
      this.orders = order;
      this.loading = false
      //console.log(order);
    },
    (error) => {
      console.error('Error fetching orders', error);
      this.loading = false
    });
  }

  fetchProducts() {
    this.orderDataSevice.getProducts().subscribe((prods: any) => {
      this.products = prods;
    },
    (error) => {
      console.error('Error fetching products', error);
    });
  }
}
