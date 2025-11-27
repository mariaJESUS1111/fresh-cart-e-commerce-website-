import { Component, OnInit, inject } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: product[] = [];
  private readonly productService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log('✅ API Response:', res);
        // Handle both possible shapes of API response
        this.products = res.data ? res.data : res;
      },
      error: (err) => {
        console.error('❌ Error loading products:', err);
      }
    });
  }
}
