import { Routes } from "@angular/router";
import { ConductriceLayoutComponent } from "./conductrice-layout/conductrice-layout.component";
import { ConductriceDashboardComponent } from "./conductrice-dashboard/conductrice-dashboard.component";
import { ListVoyageComponent } from "./list-voyage/list-voyage.component";
import { AddVoyageComponent } from "./add-voyage/add-voyage.component";
import { ListReservationComponent } from "./list-reservation/list-reservation.component";

export const CONDUCTRICE_ROUTES: Routes = [
    {
      path: '',
      component: ConductriceLayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        
        // dashboard
        {path: 'dashboard', component:ConductriceDashboardComponent},
  
        // voyages
        { path: 'voyages', component: ListVoyageComponent},
        { path: 'voyages/add', component: AddVoyageComponent },
  
        //reservations
        { path: 'reservation/voyage/:id', component: ListReservationComponent },
      ]
    }
  ];
  