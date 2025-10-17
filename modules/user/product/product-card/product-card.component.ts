import { Component, Input } from '@angular/core';
import { product } from '../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  standalone: true, // ✅ must be standalone if you import it directly
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: product; // ✅ lowercase type name
}
