import { Component, inject, Input } from '@angular/core';
import { product } from '../models/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product!: product;

  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);

  isAdding = false;

  addToCart(event: MouseEvent, productId: string): void {
    event.stopPropagation();  // prevent card click navigation
    event.preventDefault();   // prevent <a> default behavior

    if (this.isAdding) return;
    this.isAdding = true;

    this._cartService.addProduct(productId).subscribe({
      next: () => {
        // ✅ Show success alert with animation
        this._toastr.success(
          `${this.product.title} added to cart successfully!`,
          'Product Added',
          {
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
            timeOut: 2500,
            easeTime: 300
          }
        );

        this.isAdding = false;
      },
      error: (err) => {
        this._toastr.error(
          'Could not add product to cart. Please log in first.',
          'Error',
          {
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
            easeTime: 300
          }
        );
        this.isAdding = false;
        console.error('Add to cart error:', err);
      }
    });
  }
}
