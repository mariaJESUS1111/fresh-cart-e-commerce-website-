import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../modules/user/orders/services/category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);

  category: Category | null = null;
  isLoading = true;
  errorMsg = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCategory(id);
    } else {
      this.errorMsg = 'Invalid category ID.';
      this.isLoading = false;
    }
  }

  private loadCategory(id: string): void {
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
