import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { environment } from '../environments/environment.dev';
import { JwtService } from './services/JwtService.service';
import { jwtDecode } from 'jwt-decode';
import { AuthDataService } from './services/auth.service';
import { Client } from './models/client.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  isDarkMode = false;
  isLoggedIn = false;
  logedUser: Client[] = []; 

  constructor(private router: Router, jwtservice: JwtService, private authDataService: AuthDataService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authDataService.isAuthenticated(); 
    this.getClient();
    this.checkAuthentication();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
    document.querySelector('.side-container')?.classList.toggle('dark-mode');
    document.querySelector('.content-container')?.classList.toggle('dark-mode');
    document.querySelector('.mat-cont')?.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  logOff(){
    localStorage.clear();
    window.location.href='/';
  }

  getClient(){
    const client =  localStorage.getItem('clientId')
    var intClientId = 0;
    if(client){
      intClientId = parseInt(client);
    }   
  
    this.authDataService.getUser(intClientId).subscribe((client: any)=>{
      this.logedUser = client;
      //console.log(client)
    },
    (error) =>{
      console.log("Guest user unauthorized!")
    });
  }

  checkAuthentication(): void {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      this.logout();  // Logs out the user if there's no auth token
    }
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Optionally remove the token if present
    this.router.navigate(['/login']);     // Redirect to login page
  }
  title = 'Client-Portal';
}
