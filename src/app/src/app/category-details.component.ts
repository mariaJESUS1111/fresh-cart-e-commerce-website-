import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '.././app/modules/user/orders/services/category.service';
import { Category } from './category.model';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);

  category: Category | null = null;
  isLoading = true;
  errorMsg = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCategoryDetails(id);
    } else {
      this.errorMsg = 'Invalid category ID.';
      this.isLoading = false;
    }
  }

  private loadCategoryDetails(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (res: any) => {
        this.category = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = '❌ Failed to load category details.';
        this.isLoading = false;
      }
    });
  }
}
