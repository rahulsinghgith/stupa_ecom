import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  disableSignUpButton: boolean = true;
  err!: string;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      avatar: ['https://picsum.photos/800']
    });

    // Subscribe to form value changes to enable/disable button
    this.signUpForm.valueChanges.subscribe(() => {
      this.disableSignUpButton = this.signUpForm.invalid;
    });
  }

  signUp() {
    this.disableSignUpButton = true;
    if (this.signUpForm.valid) {
      const { name, email, password, confirmPassword } = this.signUpForm.value;
      
      if (password !== confirmPassword) {
        this.err = 'Passwords do not match!';
        return;
      }
      
      this.authService.createUser(this.signUpForm.value).subscribe({
        next: (res) => {
          this.err = "";
          this.disableSignUpButton = false;
          this.router.navigateByUrl("/login");
        },
        error: (_error) => {
          this.err = "Unable to create user";
          this.disableSignUpButton = false;
        }
      });
    }
  }
}
