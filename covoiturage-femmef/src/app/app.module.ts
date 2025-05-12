import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FinancesComponent } from './finances/finances.component';
import { HttpClientModule } from '@angular/common/http';  // Importation du HttpClientModule


@NgModule({
  declarations: [
    AppComponent,
    FinancesComponent,
      // Déclaration du composant TransactionHistory ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
