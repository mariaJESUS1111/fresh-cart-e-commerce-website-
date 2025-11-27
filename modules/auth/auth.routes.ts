import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forgotpassword', loadComponent: () => import('./pages/forgotpassword/forgotpassword.component').then(c => c.ForgotpasswordComponent) },
    ]
  }
];
