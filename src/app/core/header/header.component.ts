import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated!: Observable<boolean>;
  currUser!: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.isAuthenticated = this.authService.getAuthAsObservable();
    this.isAuthenticated.subscribe(_data => {
      this.callCurrUser();
    });
  }

  callCurrUser() {
    this.authService.getCurrUser().subscribe((data) => {
      this.currUser = data;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
