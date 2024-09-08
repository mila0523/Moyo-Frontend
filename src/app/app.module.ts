import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatIconModule } from '@angular/material/icon';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApexChart, ApexAxisChartSeries } from 'ng-apexcharts';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
    NewOrderComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule
  ],
    providers:[
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})

export class AppModule { }
