import { Component, OnInit, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: string | null = null;
  product: any = null;
  loading = true;

  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) this.getProductById(this.id);
      }
    });
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
        this.loading = false;
        console.log('✅ Product Details:', this.product);
      },
      error: (err) => {
        console.error('❌ Error loading product:', err);
        this.loading = false;
      }
    });
  }
}
