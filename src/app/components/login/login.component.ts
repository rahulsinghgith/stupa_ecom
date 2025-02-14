import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInForm!: FormGroup;
  disableLoginButton = false;
  err = "";

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.logInForm = this.createLogInForm();
  }

  createLogInForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.disableLoginButton = true;
    if (this.logInForm.valid) {
      this.authService.login(this.logInForm.value).subscribe(
        {
          next: (res) => {
            localStorage.setItem('authToken', res.access_token);
            this.err = "";
            this.disableLoginButton = false;
            this.authService.setAuthenticated();
            this.authService.setCurrentUser();
            this.router.navigateByUrl("/products");
          },
          error: (_error) => {
            this.err = "User Name or Password Incorrect";
            this.disableLoginButton = false;
          }
        }
      );
    }
  }
}
