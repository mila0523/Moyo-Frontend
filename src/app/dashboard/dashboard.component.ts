import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexChart, ApexAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from '../services/cookies.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthDataService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  constructor(private cookieService: CookieService,private authDataService: AuthDataService, router: Router){}

  ngOnInit(): void {   
    this.reloadPageOnce();
  }

  reloadPageOnce() {
    // Check if the page has been reloaded before
    if (!localStorage.getItem('reloaded')) {
      // Set the flag in localStorage
      localStorage.setItem('reloaded', 'true');
      // Reload the page
      window.location.reload();
    } else {
      // Remove the flag after the page has been reloaded
      localStorage.removeItem('reloaded');
    }
  }
}

