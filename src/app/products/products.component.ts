import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDataService } from '../services/orderData.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  products: Product[] = [];
  displayedColumns: string[] = ['Product Name', 'Description', 'Price', 'Stock Units', 'Date Created'];
  pageSize = 10;
  currentPage = 0;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderDataSevice: OrderDataService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;

    this.orderDataSevice.getProducts().subscribe((prods: any) => {
      this.products = prods;
      this.dataSource.data = prods;
      this.loading = false;
      this.dataSource.paginator = this.paginator
    },
    (error) => {
      console.error('Error fetching products', error);
      this.loading = false
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // update the data source with the new page data
    this.dataSource.data = this.products.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }
}
