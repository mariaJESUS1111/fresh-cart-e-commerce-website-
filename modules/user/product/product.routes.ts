import { Routes } from "@angular/router";

export const PRODUCTS_ROUTES: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    title: 'Products'
  },

  {
  path: 'product-details/:id',
  loadComponent: () =>
    import('./pages/product-details/product-details.component').then(
      (c) => c.ProductDetailsComponent
    ),
  title: 'Product Details'
}

];
