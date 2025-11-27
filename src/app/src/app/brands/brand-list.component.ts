import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrandService } from './brand.service';
import { Brand } from './brands.model';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  isLoading = true;
  errorMsg = '';

  private readonly brandService = inject(BrandService);

  ngOnInit(): void {
    this.brandService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load brands.';
        this.isLoading = false;
      }
    });
  }
}

