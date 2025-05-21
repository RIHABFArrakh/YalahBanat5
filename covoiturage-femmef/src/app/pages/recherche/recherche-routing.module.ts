import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechercheComponent } from './recherche.component';

const routes: Routes = [ { path: '', component: RechercheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RechercheRoutingModule { }