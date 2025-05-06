import { Routes } from '@angular/router';
import { ConductriceDashboardComponent } from './conductrice-dashboard/conductrice-dashboard.component';

export const CONDUCTRICE_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: ConductriceDashboardComponent
  },
  // Ajoute d'autres routes si nécessaire
];
