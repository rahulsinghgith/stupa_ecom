import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItemCount!: Observable<number>;
  isAuthenticated!: Observable<boolean>;
  currUser!: User;

  constructor(private authService: AuthService,private cartService : CartService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthAsObservable();
    this.isAuthenticated.subscribe(_data => {
      this.callCurrUser();
    });
  }

  callCurrUser() {
    this.authService.getCurrUser().subscribe((data) => {
      this.currUser = data;
      this.cartItemCount = this.cartService.getCartCountAsObservable(this.currUser);
    });
  }

  logOut() {
    this.cartService.cartCount$.next(0);
    this.authService.logOut();
  }
}
