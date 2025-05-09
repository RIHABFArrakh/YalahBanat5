import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechercheRoutingModule } from './recherche-routing.module';
import { RechercheComponent } from './recherche.component';

@NgModule({
  imports: [
    CommonModule,
    RechercheRoutingModule,
    RechercheComponent  // ✅ ici au lieu de le déclarer
  ]
})
export class RechercheModule {}
