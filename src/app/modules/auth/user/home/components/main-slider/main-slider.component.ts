import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule], // ✅ Add CarouselModule here
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent {
  customOptions = {
    loop: true,
    dots: false,
    nav: true,
    navSpeed:700,

    autoplay: true,
    autoplayTimeout: 3000,
responsive:{
  0:{
    items:1
  }
}
  }
}





