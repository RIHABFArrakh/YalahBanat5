// profil.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonProfilComponent } from '../../mon-profil/mon-profil.component';



@NgModule({
  declarations: [MonProfilComponent],
  imports: [CommonModule, FormsModule],
  exports: [MonProfilComponent]
})
export class ProfilModule { }
