// jwt.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router){};

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  checkAndDecodeJWT() {
    const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with the key used to store the token
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded JWT:', decodedToken);
        // You can now use the decodedToken as needed
      } catch (error) {
        console.error('Invalid JWT:', error);
        this.router.navigate(['/'])
      }
    } else {
      console.log('No JWT found in localStorage');
      this.router.navigate(['/'])
    }
  }
}
