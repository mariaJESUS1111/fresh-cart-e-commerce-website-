import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // Using inject() for dependencies in modern Angular
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  // Note: If you prefer the constructor method, the original code was:
  // constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(
    cartId: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    const returnUrl = '?url=http://localhost:4200/user';
console.log(cartId,shippingAddress)
    // FIX: Corrected the closure of the http.post call.
    return this.http.post(
      // 1. URL Construction: Ensure no extra spaces.
      environment.apiUrl + 'orders/checkout-session/' + cartId+ returnUrl,

      // 2. Request Body
      {
        shippingAddress,
      },

      // 3. Options (Headers)
      {
        headers: { token: this.authService.getToken()! },
      }
    ); // <--- Closing parenthesis for http.post()
  }
}
