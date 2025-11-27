// src/app/services/cart.service.ts
import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/auth/services/auth.service';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Cart {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: Data;
}
export interface Data {
  _id: string;
  cartOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface Product {
  count: number;
  _id: string;
  product: Product2;
  price: number;
}
export interface Product2 {
  subCategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  // Signal that holds the number of items
  cartCount: WritableSignal<number> = signal(0);

  constructor() {
    // optionally restore from localStorage (if you want persistence when offline)
    try {
      const saved = localStorage.getItem('cartCount');
      if (saved) this.cartCount.set(Number(saved));
    } catch (e) {
      // ignore
    }
  }

  private saveCountToStorage(count: number) {
    try {
      localStorage.setItem('cartCount', String(count));
    } catch (e) {}
  }

  private updateCartCount(count: number) {
    this.cartCount.set(count ?? 0);
    this.saveCountToStorage(this.cartCount());
  }

  // add product (calls backend and then updates signal)
  addProduct(productId: string): Observable<Cart> {
    return new Observable((observer) => {
      this.http.post<Cart>(environment.apiUrl + 'cart', { productId }, {
        headers: { token: this.authService.getToken()! }
      }).subscribe({
        next: (res) => {
          // backend returns numOfCartItems
          if (res && typeof res.numOfCartItems === 'number') {
            this.updateCartCount(res.numOfCartItems);
          } else if (res?.data?.products) {
            this.updateCartCount(res.data.products.reduce((s, p) => s + (p.count ?? 0), 0));
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  // get cart (used on load)
  getLoggedUserCart(): Observable<Cart> {
    return new Observable((observer) => {
      this.http.get<Cart>(environment.apiUrl + 'cart', {
        headers: { token: this.authService.getToken()! }
      }).subscribe({
        next: (res) => {
          if (res && typeof res.numOfCartItems === 'number') {
            this.updateCartCount(res.numOfCartItems);
          } else if (res?.data?.products) {
            this.updateCartCount(res.data.products.reduce((s, p) => s + (p.count ?? 0), 0));
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  updateQuantity(productId: string, count: number): Observable<Cart> {
    return new Observable((observer) => {
      this.http.put<Cart>(environment.apiUrl + `cart/${productId}`, { count }, {
        headers: { token: this.authService.getToken()! }
      }).subscribe({
        next: (res) => {
          if (res && typeof res.numOfCartItems === 'number') {
            this.updateCartCount(res.numOfCartItems);
          } else if (res?.data?.products) {
            this.updateCartCount(res.data.products.reduce((s, p) => s + (p.count ?? 0), 0));
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  removeItem(productId: string): Observable<Cart> {
    return new Observable((observer) => {
      this.http.delete<Cart>(environment.apiUrl + `cart/${productId}`, {
        headers: { token: this.authService.getToken()! }
      }).subscribe({
        next: (res) => {
          if (res && typeof res.numOfCartItems === 'number') {
            this.updateCartCount(res.numOfCartItems);
          } else if (res?.data?.products) {
            this.updateCartCount(res.data.products.reduce((s, p) => s + (p.count ?? 0), 0));
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  clearCart(): Observable<Cart> {
    return new Observable((observer) => {
      this.http.delete<Cart>(environment.apiUrl + 'cart', {
        headers: { token: this.authService.getToken()! }
      }).subscribe({
        next: (res) => {
          this.updateCartCount(0);
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
