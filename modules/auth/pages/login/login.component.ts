import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg: string = '';
  showPassword: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe({
        next: (res: any) => {
          if (res.status === true || res.message === 'success') {
            this.authService.saveToken(res.token);
            this.router.navigate(['user/home']);
          } else {
            this.errorMsg = res.message || 'Invalid credentials';
          }
        },
        error: () => {
          this.errorMsg = 'Login failed. Please try again.';
        }
      });
    } else {
      this.authForm.markAllAsTouched();
    }
  }
}




