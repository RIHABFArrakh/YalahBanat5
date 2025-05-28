import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';
import { ReservationPageComponent } from './features/reservation/reservation-page/reservation-page.component';
import { FinancesComponent } from './finances/finances.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { ListReservationComponent } from './features/conductrice/list-reservation/list-reservation.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
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
  path: 'reservations/:conductriceId/:voyageId',
  component: ListReservationComponent
  },
  {
    path: 'finances',
    component: FinancesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'conductrice' }
  },
  {
    path: 'recherche', // ✅ Route vers la page de recherche
    loadChildren: () =>
      import('./pages/recherche/recherche.module').then(m => m.RechercheModule),
  },
  {
    path: 'mon-profil', // New route
    component: MonProfilComponent,
  
  },
  {
     path: 'list-reservation',
      component: ListReservationComponent },
];
