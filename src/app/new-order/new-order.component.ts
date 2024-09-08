import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../services/orderData.service';
import { Product } from '../models/product.model';
import { OrderItem } from '../models/orderItem.model';
import { CreateOrderRequest } from '../models/CreateOrderRequest.model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent implements OnInit {
  products: Product[] = [];
  items: OrderItem[] = [
    { productId: 0, quantity: 1, unitPrice: 0, lineTotal: 0 }
  ];
  totalAmount: number = 0;
  clientId: number = 0;
  orderItems: OrderItem[] = [];

  constructor(private orderDataService: OrderDataService, router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.clientId = Number(localStorage.getItem('clientId'));

    //if client is not available
    if (!this.clientId) {
      console.error('Client ID not found in localStorage');
    }
  }

  fetchProducts() {
    this.orderDataService.getProducts().subscribe((productList: any) => {
      this.products = productList;
      //console.log(productList);
    });
  }

  addRow() {
    this.items.push({ productId: 0, quantity: 1, unitPrice: 0, lineTotal: 0 });
  }

  removeRow(index: number) {
    this.items.splice(index, 1);
    this.calculateTotal();
  }

  updateUnitPrice(item: any) {
    //console.log(item)
    const selectedProduct = this.products.find(p => p.productName === item.product);
    if (selectedProduct) {
      item.productId = selectedProduct.productId;
      item.unitPrice = selectedProduct.price;
      this.calculateTotal();
    } else {
      item.productId = 0;
      item.unitPrice = 0;
    }
    this.calculateTotal();
  }

  calculateTotal() {
    //calculate the lineTotal for each item
    this.items.forEach(item => {
      item.lineTotal = item.quantity * item.unitPrice;
    });

    //calculate the total amount for all items
    this.totalAmount = this.items.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  // Submit the order
  submitOrder() {
    const orderItems: OrderItem[] = this.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal,
    }));

    console.log(orderItems);

    const orderRequest: CreateOrderRequest = {
      clientId: this.clientId,
      totalAmount: this.totalAmount,
      orderItems: orderItems
    };

    this.orderDataService.createOrder(orderRequest).subscribe({
      next: (orderId) => {
        console.log(`Order created with ID:`);
        alert("Order successfully created")
        // Navigate to view all the orders
        window.location.href ='/order'
      },
      error: (err) => {
        console.error('Error creating order', err);
        alert(err.error + " Please try again or contact support");
        window.location.reload();
      }
    });
  }
}
