import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';  // ✅ Avec un "s" à guards
import { ReservationPageComponent } from './features/reservation/reservation-page/reservation-page.component';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/landing-page/landing-page.component').then(m => m.LandingPageComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/public/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'conductrice',
    loadChildren: () =>
      import('./features/conductrice/conductrice.routes').then(m => m.CONDUCTRICE_ROUTES),
  },
  {
    path: 'passager',
    loadChildren: () =>
      import('./features/passager/passager.routes').then(m => m.PASSAGER_ROUTES),
  },
  {
    path: 'dashboard-conductrice',
    loadComponent: () =>
      import('./features/conductrice/conductrice-dashboard/conductrice-dashboard.component')
        .then(m => m.ConductriceDashboardComponent),
    canActivate: [roleGuard],
    data: { expectedRole: 'conductrice' }
  },
  {
    path: 'reservation/:id',
    component: ReservationPageComponent
  }
];
