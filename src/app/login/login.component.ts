import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/authResponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessages: string[]  = []; // To store validation errors
  isPasswordVisible: boolean = false; 
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authDataService: AuthDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authDataService.authUser(email, password).subscribe(
        (response: LoginResponse) => {         
          console.log('Login successful:');
          //save token to local storage
          localStorage.setItem('authToken', response.token);

          this.router.navigate(['/dashboard']);
          this.isLoggedIn = this.authDataService.isAuthenticated();
        },
        (error) => {
          console.error('Login error:', error);
          if (error.error && error.error.message) {
            this.errorMessages = [error.error.message]; // Set error message as a single-element array
          } else if (error.error && error.error.errors) {  
            this.errorMessages = Object.values(error.error.errors).flat() as string[];
          } else {
            this.errorMessages = ['An unexpected error occurred. Please try again.'];
          }
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible; // Toggle visibility
  }
}
