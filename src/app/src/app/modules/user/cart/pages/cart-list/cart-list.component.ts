import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../../../../services/cart.service';
import { Cart } from '../../models/cart.interface';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { Router, RouterLink } from "@angular/router";
import { AlertComponent } from '../../../../../alert.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, RouterLink, AlertComponent],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartDetails: Cart | null = null;
  isLoaded = false;

  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' = 'success';

  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadCartItems();
  }

  // ✅ Show custom alert message
  showAlert(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => (this.alertMessage = null), 2000);
  }

  // ✅ Load cart
  loadCartItems(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res: Cart) => {
        this.cartDetails = res;
        this.isLoaded = true;
      },
      error: (err) => console.log('❌ CART ERROR:', err)
    });
  }

  // ✅ Remove item
  removeItem(productId: string) {
    this.cartService.removeItem(productId).subscribe({
      next: (res) => {
        this.cartDetails = res;
        this.showAlert('🗑️ Product removed from cart', 'error');
      },
      error: () => this.showAlert('Error removing product', 'error')
    });
  }

  // ✅ Increase quantity
  increaseQuantity(productId: string) {
    const item = this.cartDetails?.data?.products.find(p => p.product._id === productId);
    if (!item) return;

    item.count += 1;
    this.cartDetails!.data!.totalCartPrice += item.price;
    this.showAlert('✅ Quantity increased', 'success');

    this.cartService.updateQuantity(productId, item.count).subscribe({
      error: () => this.showAlert('Error syncing with server', 'error')
    });
  }

  // ✅ Decrease quantity
  decreaseQuantity(productId: string) {
    const item = this.cartDetails?.data?.products.find(p => p.product._id === productId);
    if (!item || item.count <= 1) return;

    item.count -= 1;
    this.cartDetails!.data!.totalCartPrice -= item.price;
    this.showAlert('➖ Quantity decreased', 'info');

    this.cartService.updateQuantity(productId, item.count).subscribe({
      error: () => this.showAlert('Error syncing with server', 'error')
    });
  }

  // ✅ Checkout navigation
  goToCheckout() {
    this.showAlert('🛒 Checkout works! Redirecting...', 'success');
    setTimeout(() => {
      if (this.cartDetails?.data?._id) {
        this.router.navigate(['/user/address', this.cartDetails.data._id]);
      }
    }, 1500);
  }
}
