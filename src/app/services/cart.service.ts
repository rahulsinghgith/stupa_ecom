import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userCartMap: Map<number, Product[]> = new Map();
  constructor() {
    this.loadCartFromLocalStorage();
  }

  getCartCountAsObservable(user: User): Observable<number> {
    this.getCartData(user);
    return this.cartCount$.asObservable() as Observable<number>;
  }

  loadCartFromLocalStorage(): void {
    const storedCartData = localStorage.getItem('cart');
    if (storedCartData && Object.entries(storedCartData).length > 2) {
      const cartArray = JSON.parse(storedCartData);
      // Convert the array back to a Map
      this.userCartMap = new Map(cartArray);
    }
  }

  addToCart(product: Product, user?: User) {
    const currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      currUserCartproducts.push(product);
    } else {
      let cartDetails: Product[] = [];
      cartDetails.push(product);
      this.userCartMap.set(user?.id!, cartDetails)
    }
    const cartData = Array.from(this.userCartMap.entries());

    this.cartCount$.next(Array.from(this.userCartMap.entries())[0][1].length);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  getCartData(user?: User): Product[] {
    const productData: Product[] = this.userCartMap.get(user?.id!) || [];
    this.cartCount$.next(productData.length);
    return productData;
  }

  removeItemQuantity(productId: number, user?: User) {
    let currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      currUserCartproducts.splice(currUserCartproducts.findIndex(product => product.id === productId), 1);
      const cartData = Array.from(this.userCartMap.entries());
      this.cartCount$.next(Array.from(this.userCartMap.entries())[0][1].length);
      localStorage.setItem('cart', JSON.stringify(cartData));
    };
  }

  removeCartItem(productId: number, user?: User) {
    let currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      const itemsAfterRemovalOfProduct: Product[] = currUserCartproducts.filter(product => product.id !== productId);
      this.userCartMap.set(user?.id!, itemsAfterRemovalOfProduct);
      const cartData = Array.from(this.userCartMap.entries());
      this.cartCount$.next(Array.from(this.userCartMap.entries())[0][1].length);
      localStorage.setItem('cart', JSON.stringify(cartData));
    }

  }

  checkoutCart(user?: User) {
    let currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      this.userCartMap.set(user?.id!, []);
      const cartData = Array.from(this.userCartMap.entries());
      this.cartCount$.next(Array.from(this.userCartMap.entries())[0][1].length);
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  }
  getCartItemCount() {
    let totalCount = 0;
    const cartData = Array.from(this.userCartMap.entries());
    totalCount = cartData[0][1].length;
    this.cartCount$.next(totalCount);
  }
}
