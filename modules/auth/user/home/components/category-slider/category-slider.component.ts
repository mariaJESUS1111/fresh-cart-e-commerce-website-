import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../../user/orders/services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit {
  categories: Category[] = [];

  private readonly categoryService = inject(CategoryService);

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      900: {
        items: 5
      },
      1200: {
        items: 6
      }
    }
  };

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error('❌ Error loading categories:', err);
      }
    });
  }
}
