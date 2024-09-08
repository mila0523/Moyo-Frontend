import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { LoginResponse } from '../models/authResponse.model';
import { jwtDecode } from 'jwt-decode';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root'
})

export class AuthDataService {
    private apiUrl: string;

    httpOptions = {
        headers: new HttpHeaders({
            ContentType: 'application/json'
        })
    }

    constructor(private httpClient: HttpClient, private router: Router) {
        this.apiUrl = environment.apiUrl;
    }

    authUser(email: string, password: string): Observable<LoginResponse> {
        let authuser = { email, password };
        return this.httpClient.post<LoginResponse>(`${this.apiUrl}Auth/Login?email=${email}&password=${password}`, authuser)
    }

    getUser(clientId: number): Observable<Client[]> {
        return this.httpClient.get<Client[]>(`${this.apiUrl}Auth/getClient?id=${clientId}`)
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.log('No JWT found in localStorage');
            this.router.navigate(['/login']);
            return false;
        }
        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            //console.log(decodedToken);
            localStorage.setItem('clientId', decodedToken.nameid)

            // Check if the token is expired
            if (decodedToken.exp && decodedToken.exp < currentTime) {
                console.log('JWT token has expired');
                this.router.navigate(['/login']);
                localStorage.clear();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error decoding JWT token', error);
            return false;
        }
    }

    decodeToken(){
        const token = localStorage.getItem('authToken');

        if(token){
            const decodedToken: any = jwtDecode(token);
            return decodedToken;
        }else{
           return null
        }
    }
}

