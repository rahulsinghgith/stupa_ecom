import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productId!: number;
  product!: Product;
  imageUrls: string[] = [];
  currentIndex: number =0 ;
  currUser!: User;

  constructor(private route: ActivatedRoute, private productService: ProductsService,
    private cartService: CartService,private authService: AuthService,private router: Router) {
  }
  ngOnInit(): void {
    this.authService.getCurrUser().subscribe((data) => {
      this.currUser = data;
    });
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe(res => {
      this.product = res;
      this.imageUrls = JSON.parse(res.images.toString());
      console.log(this.imageUrls);
      
    })
    
  }

  // Navigate to the next image
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
  }

  // Navigate to the previous image
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product, this.currUser);
    this.router.navigateByUrl("products/cart");
  }


}
