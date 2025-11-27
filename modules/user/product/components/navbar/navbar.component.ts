// src/app/shared/components/navbar/navbar.component.ts
import { Component, inject, Input, effect, signal, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../auth/services/auth.service';

import { CartService } from '../../../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() authType: 'auth' | 'user' = 'auth';
  isMobileOpen = false;

  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  // expose cart count signal to template
  cartCount: Signal<number> = this.cartService.cartCount;

  // a local signal to toggle bump animation
  private bump = signal(false);
  bump$ = this.bump; // expose to template

  constructor() {
    // create an effect to trigger bump animation whenever count changes
    effect(() => {
      const current = this.cartService.cartCount();
      if (current > 0) {
        // trigger bump
        this.bump.set(true);
        // remove bump after 400ms so CSS animation can play
        setTimeout(() => this.bump.set(false), 400);
      }
    });
  }

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  ngOnInit(): void {
    // debug if needed
    // console.log(this.authService.decodeToken)
  }

  logout() {
    this.authService.logout();
  }
}

