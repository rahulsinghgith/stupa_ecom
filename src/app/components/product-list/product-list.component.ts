import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';



@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  displayedColumns: string[] = ['title', 'category', 'price', 'actions'];
  productData: MatTableDataSource<Product> = new MatTableDataSource();
  orignalData: MatTableDataSource<Product> = new MatTableDataSource();
  categories: any[] = [];
  searchQuery = '';
  selectedCategory = '';
  priceRange: number = 1000;
  currUser!: User;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService , private productService: ProductsService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.authService.getCurrUser().subscribe((data) => {
      this.currUser = data;
    });
    this.productService.getAllProducts().subscribe((products: any[]) => {
      this.productData.data = this.orignalData.data = products;
      this.productData.paginator = this.paginator;
      this.productData.sort = this.sort;
      this.categories = [...new Set(products.map(product => product.category.name))];

    });
  }

  applyFilter() {
    this.productData.filter = this.searchQuery.trim().toLowerCase();
  }

  filterByCategory() {
    this.productData.data = this.orignalData.data;
    this.productData.data = this.productData.data.filter((product: Product) => {
      return this.selectedCategory ? product.category.name === this.selectedCategory : true
    });

  }

  filterByPrice() {
    this.productData.data = this.orignalData.data;
    this.productData.data = this.productData.data.filter(product => {
      return product.price <= this.priceRange
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.currUser);
    this.router.navigateByUrl("products/cart");
  }


}
