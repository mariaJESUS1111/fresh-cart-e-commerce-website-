import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMsg: string = "";
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router ) ;

  authForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { validators: RegisterComponent.passwordsMatch }
  );

  static passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;
    return pass === rePass ? null : { passwordMismatch: true };
  }

  submitForm() {
    if (this.authForm.valid) {
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.router.navigate(['/auth/login']);
          }
        },
        error: (error) => {
          this.errorMsg = error.error.message;
        }
      });
    } else {
      this.authForm.markAllAsTouched();
    }
  }
}
