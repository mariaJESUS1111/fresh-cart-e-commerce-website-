import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from './brand.service';
import { Brand } from './brands.model';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly brandService = inject(BrandService);

  brand: Brand | null = null;
  isLoading = true;
  errorMsg = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.brandService.getBrandById(id).subscribe({
        next: (res) => {
          this.brand = res.data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMsg = 'Failed to load brand details.';
          this.isLoading = false;
        }
      });
    }
  }
}
