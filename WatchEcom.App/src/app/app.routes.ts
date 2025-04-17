import { provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WatchesComponent } from './watches/watches.component';
import { RegisterComponent } from './register/register.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Auth guard function
const authGuard = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('loggedInUser') !== null;
  
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const appRoutes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' as const },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'watches', 
    component: WatchesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./wishlist/wishlist.component').then(m => m.WishlistComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(appRoutes, withComponentInputBinding())
];
