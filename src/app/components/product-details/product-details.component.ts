import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

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

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
  }
  ngOnInit(): void {
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



}
