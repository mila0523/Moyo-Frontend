import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('authToken');

    // Clone the request to add the new header
    const authReq = token ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;

    // Pass the cloned request instead of the original request to the next handler
    return next.handle(authReq);
  }
}
