import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  userCartMap: Map<number, Product[]> = new Map();
  constructor() {
    this.loadCartFromLocalStorage();
  }

  loadCartFromLocalStorage(): void {
    const storedCartData = localStorage.getItem('cart');
    console.log(storedCartData!);


    if (storedCartData && Object.entries(storedCartData).length > 2) {
      const cartArray = JSON.parse(storedCartData);
      // Convert the array back to a Map
      this.userCartMap = new Map(cartArray);
    }
  }

  addToCart(product: Product, user?: User) {
    console.log(user);

    const currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    console.log(currUserCartproducts);

    if (currUserCartproducts) {
      currUserCartproducts.push(product);
    } else {
      let cartDetails: Product[] = [];
      cartDetails.push(product);
      this.userCartMap.set(user?.id!, cartDetails)
    }
    const cartData = Array.from(this.userCartMap.entries());

    console.log(JSON.stringify(this.userCartMap));
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  getCartData(user?: User): Product[] {
    return this.userCartMap.get(user?.id!) || [];
  }

  removeItemQuantity(productId: number, user?: User) {
    console.log(productId, user);

    let currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      currUserCartproducts.splice(currUserCartproducts.findIndex(product => product.id === productId), 1);
      const cartData = Array.from(this.userCartMap.entries());
      console.log(JSON.stringify(this.userCartMap));
      localStorage.setItem('cart', JSON.stringify(cartData));
    };
  }

  removeCartItem(productId: number, user?: User) {
    let currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      const itemsAfterRemovalOfProduct: Product[] = currUserCartproducts.filter(product => product.id !== productId);
      this.userCartMap.set(user?.id!, itemsAfterRemovalOfProduct);
      const cartData = Array.from(this.userCartMap.entries());
      localStorage.setItem('cart', JSON.stringify(cartData));
    }

  }

  checkoutCart(user?: User) {
    let currUserCartproducts: Product[] | undefined = this.userCartMap.get(user?.id!);
    if (currUserCartproducts) {
      this.userCartMap.set(user?.id!, []);
      const cartData = Array.from(this.userCartMap.entries());
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  }
}
