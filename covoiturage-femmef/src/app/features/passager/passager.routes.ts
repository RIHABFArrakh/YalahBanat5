import { Routes } from "@angular/router";
import { PassagerLayoutComponent } from "./passager-layout/passager-layout.component";
import { PassagerDashboardComponent } from "./passager-dashboard/passager-dashboard.component";
import { BookVoyageComponent } from "./book-voyage/book-voyage.component";
import { BookHistoryComponent } from "./book-history/book-history.component";

export const PASSAGER_ROUTES: Routes = [
    {
      path: '',
      component: PassagerLayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        
        // dashboard
        {path: 'dashboard', component:PassagerDashboardComponent},
  
        // voyages
        { path: 'reserver/:id', component: BookVoyageComponent},
        { path: 'history', component: BookHistoryComponent },
  
      ]
    }
  ];
  