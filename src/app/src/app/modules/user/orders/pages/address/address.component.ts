import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../product/services/order.service';
import { ErrorsMessageComponent } from '../../../../../shared/components/errors-message/errors-message.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorsMessageComponent, RouterModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  addressForm!: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';
  cartId: string = '';
  isLoading = false;

  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cartId = params.get('id')!;
    });
    this.initForm();
  }

  initForm() {
    this.addressForm = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      city: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.orderService.createOrder(this.cartId, this.addressForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;

        // ✅ show success
        this.successMsg = 'Order created successfully! Redirecting to payment... 🎉';

        // ✅ redirect to fake bank link after 2 seconds
        if (res?.session?.url) {
          setTimeout(() => {
            window.location.href = res.session.url; // redirect to Stripe/fake payment
          }, 2000);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Something went wrong. Please try again.';
      },
    });
  }
}

