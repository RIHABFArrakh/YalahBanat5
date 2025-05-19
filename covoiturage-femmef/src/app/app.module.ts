import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FinancesComponent } from './finances/finances.component';
import { PassagerDashboardComponent } from './features/passager/passager-dashboard/passager-dashboard.component';
import { AuthInterceptor } from './auth.interceptor'; // ✅ à ajouter

@NgModule({
  declarations: [
    AppComponent,
    FinancesComponent,
    PassagerDashboardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
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
  