import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartData: Product[] = [];
  cartQuantityMap: Map<number, number> = new Map();
  currUser!: User;
  showLoader:boolean = false;
  constructor(private authService: AuthService, private productService: ProductsService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.showLoader = true;
    this.authService.getCurrUser().subscribe((data) => {
      this.currUser = data;
      this.cartData = this.cartService.getCartData(this.currUser);
      this.initializeCartQuantityMap();
      this.showLoader = false;
    });


  }

  initializeCartQuantityMap() {
    this.cartQuantityMap.clear();
    this.cartData.forEach(product => {
      const currentQty = this.cartQuantityMap.get(product.id) || 0;
      this.cartQuantityMap.set(product.id, currentQty + 1);
    });
  }


  updateQuantity(productId: number, quantity: number, op: string) {
    if (quantity > 0) {
      this.cartQuantityMap.set(productId, quantity);
      if(op === 'add') {
        this.cartService.addToCart(this.cartData.find(data => data.id === productId)!, this.currUser);
      } else {
        this.cartService.removeItemQuantity(this.cartData.find(data => data.id === productId)?.id!, this.currUser);
      }
    }
  }

  // Remove product from cart and update HashMap
  removeFromCart(productId: number) {
    this.cartService.removeCartItem(productId, this.currUser);
    this.cartQuantityMap.delete(productId);
  }

  getProduct(id:number) {
    return this.cartData.find(data => data.id === id)
  }

  calTotalPrice() { 
    return this.cartService.getCartData(this.currUser).map(data =>  data.price).reduce((a,b) => a+b,0);
  }
  orderCheckout(){
    this.cartService.checkoutCart(this.currUser);
    this.router.navigateByUrl("products/checkout");
  }

}

