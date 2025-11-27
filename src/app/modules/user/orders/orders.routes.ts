import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: 'address/:id',
    loadComponent: () =>
      import('./pages/address/address.component').then(
        (c) => c.AddressComponent
      ),
    title: 'Address'
  }
];
