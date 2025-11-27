import { Component } from '@angular/core';
import { MainSliderComponent } from "../../components/main-slider/main-slider.component";
import { CategorySliderComponent } from "../../components/category-slider/category-slider.component";
import { ProductsComponent } from "../../../../../user/product/pages/products/products.component";

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, CategorySliderComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
