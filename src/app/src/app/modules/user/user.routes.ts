import { Routes } from "@angular/router";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";
import { PRODUCTS_ROUTES } from "./product/product.routes";
import { CART_ROUTES } from "./cart/cart.routes";
import { ORDER_ROUTES } from "./orders/orders.routes";
import { HOME_ROUTES } from "../auth/user/home/home.routes";
import { CategoryListComponent } from "../../category-list/category-list.component"

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      ...HOME_ROUTES,
      ...PRODUCTS_ROUTES,
      ...CART_ROUTES,
      ...ORDER_ROUTES,
      {
        path: 'categories',
        loadComponent: () =>
          import('../../category-list/category-list.component').then(
            (c) => c.CategoryListComponent
          ),
        title: 'Categories'
      },
  {
  path: 'categories/:id',
  loadComponent: () =>
    import('../../category-list/category.component').then(
      (c) => c.CategoryPageComponent
    ),
  title: 'Category Details'
},

      {
  path: 'brands',
  loadComponent: () => import('../../brands/brand-list.component').then(c => c.BrandListComponent)
},
{
  path: 'brands/:id',
  loadComponent: () => import('../../brands/brand-details.component').then(c => c.BrandDetailsComponent)
}
,

    ]
  }
];
