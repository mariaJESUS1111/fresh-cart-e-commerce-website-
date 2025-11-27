import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/cart.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @Input() product!: Product;

  @Output() removeItem = new EventEmitter<string>();
  @Output() increase = new EventEmitter<string>();
  @Output() decrease = new EventEmitter<string>();

  remove() {
    this.removeItem.emit(this.product.product._id);
  }

  inc() {
    this.increase.emit(this.product.product._id);
  }

  dec() {
    this.decrease.emit(this.product.product._id);
  }
}
