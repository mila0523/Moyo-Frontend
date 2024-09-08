import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'order', component: OrdersComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'new-order', component: NewOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
