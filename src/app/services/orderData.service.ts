import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/CreateOrderRequest.model';

@Injectable({
    providedIn: 'root'
})
export class OrderDataService {
    private apiUrl: string;

    httpOptions = {
        headers: new HttpHeaders({
            ContentType: 'application/json'
        })
    }

    constructor(private httpClient: HttpClient, private router: Router) {
        this.apiUrl = environment.apiUrl;
    }

    getProducts() {
        return this.httpClient.get(`${this.apiUrl}Order/getProducts`)
    }

    getOrders(ClientId: number): Observable<Order[]> {
        return this.httpClient.get<Order[]>(`${this.apiUrl}Order/getOrders/?clientId=${ClientId}`)
    }

    // Method to create a new order
    createOrder(orderRequest: CreateOrderRequest): Observable<number> {
        return this.httpClient.post<number>(`${this.apiUrl}Order/addOrder`, orderRequest);
    }
}

