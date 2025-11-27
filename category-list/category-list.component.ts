import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../category-list/category.service';
import { Category } from '../modules/auth/user/home/models/category';
import { CategorySliderComponent } from '../modules/auth/user/home/components/category-slider/category-slider.component';
//\auth\user\home\components\category-slider>

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CategorySliderComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => (this.categories = res.data),
      error: (err) => console.error('❌ Error fetching categories:', err)
    });
  }
}

