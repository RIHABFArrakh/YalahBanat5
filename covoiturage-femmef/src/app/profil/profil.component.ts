import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ProfilService } from '../core/services/profil.service';
import { Passager } from '../core/models/passager.model';
import { Conductrice } from '../core/models/conductrice.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  passager?: Passager;
  conductrice?: Conductrice;
  role: 'passager' | 'conductrice' = 'passager';

  constructor(
    private authService: AuthService,
    private profilService: ProfilService
  ) {}

  ngOnInit(): void {
    // Récupération de l'utilisateur courant
    this.user = this.authService.getCurrentUser();

    // Vérification de validité des données
    if (!this.user || !this.user.role || !this.user.id) {
      console.error("Utilisateur non connecté ou données manquantes");
      return;
    }

    // Chargement des données en fonction du rôle
    if (this.user.role === 'passager') {
      this.role = 'passager';
      this.profilService.getPassagerByUserId(this.user.id).subscribe({
        next: (data) => {
          this.passager = data;
        },
        error: (err) => {
          console.error('Erreur chargement passager :', err);
        },
      });
    } else if (this.user.role === 'conductrice') {
      this.role = 'conductrice';
      this.profilService.getConductriceByUserId(this.user.id).subscribe({
        next: (data) => {
          console.log(data)
          this.conductrice = data;
        },
        error: (err) => {
          console.error('Erreur chargement conductrice :', err);
        },
      });
    }
  }
  
}
