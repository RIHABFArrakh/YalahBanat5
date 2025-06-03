import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FinancesComponent } from './finances/finances.component';
import { PassagerDashboardComponent } from './features/passager/passager-dashboard/passager-dashboard.component';
import { AuthInterceptor } from './auth.interceptor'; // ✅ à ajouter
import { ReservationPopupComponent } from './reservation-popup/reservation-popup.component';
import { RechercheComponent } from './pages/recherche/recherche.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { ConductriceDashboardComponent } from './features/conductrice/conductrice-dashboard/conductrice-dashboard.component';
import { ListReservationComponent } from './features/conductrice/list-reservation/list-reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilModule } from './core/models/profil.module';
import { HowItWorksComponent } from './howitworks/howitworks.component';
@NgModule({
  declarations: [
    AppComponent,
    FinancesComponent,
    PassagerDashboardComponent,
    ConductriceDashboardComponent,
    ReservationPopupComponent,
    RechercheComponent,
    HowItWorksComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProfilModule,  // import du module qui déclare MonProfilComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  