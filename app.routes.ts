import { Routes } from '@angular/router';
import { isAuthGuard } from './core/guards/is-auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';


export const routes: Routes = [
  // Auth module (login / register)
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate:[isLoggedInGuard]
  },

  // User module (products, categories, etc.)
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.routes').then((m) => m.USER_ROUTES),
    canActivate:[isAuthGuard]
  },

  // ✅ Default redirect
  { path: '', redirectTo: 'user/products', pathMatch: 'full' },

  // ✅ 404 fallback
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
