import { Routes } from "@angular/router";

// No need to import 'title' from 'process'. It's a property on the Route object.

export const HOME_ROUTES: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' }, //


  {
    path: "home",
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
    title: "Home" // 
  }
];
