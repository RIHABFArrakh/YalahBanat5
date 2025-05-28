import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ProfilService } from '../core/services/profil.service';
import { Passager } from '../core/models/passager.model';
import { Conductrice } from '../core/models/conductrice.model';
import { UserProfileDTO } from '../dto/user-profile.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MonProfilComponent implements OnInit {
  user: any;
  passager?: Passager;
  conductrice?: Conductrice;
  role: 'passager' | 'conductrice' | null = null;
  editing = false;
  modifierMode: boolean = false;

  utilisateur: any = {
    nomComplet: '',
    membreDepuis: '',
    email: '',
    telephone: '',
    ville: '',
    bio: '',
    note: 0,
    nombreTrajets: 0,
    initiales: ''
  };

  constructor(
    private authService: AuthService,
    private profilService: ProfilService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profilService.getCurrentUserProfile().subscribe({
      next: (profile: UserProfileDTO) => {
        console.log('User Profile loaded:', profile);
        this.user = this.authService.getCurrentUser();
        if (profile.role === 'passager' || profile.role === 'conductrice') {
          this.role = profile.role;
        } else {
          console.warn('Unexpected user role received:', profile.role);
          this.role = null;
        }
        this.remplirProfil(profile);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
      },
    });
  }

  remplirProfil(profile: UserProfileDTO) {
    this.utilisateur.nomComplet = profile.name || '';
    this.utilisateur.email = profile.email || '';
    this.utilisateur.telephone = (profile as any).telephone || '';
    this.utilisateur.ville = (profile as any).ville || '';
    this.utilisateur.bio = (profile as any).bio || '';
    this.utilisateur.note = (profile as any).note || 0;
    this.utilisateur.nombreTrajets = (profile as any).trajets || (profile as any).nombreTrajets || 0;
    this.utilisateur.membreDepuis = (profile as any).membershipDate || (profile as any).membreDepuis || '';
    this.utilisateur.initiales = this.getInitiales(this.utilisateur.nomComplet);
  }

  getInitiales(nom: string): string {
    if (!nom) return '';
    const parts = nom.trim().split(' ');
    if (parts.length === 0) return '';
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  toggleModifierMode(): void {
    this.modifierMode = !this.modifierMode;
    if (!this.modifierMode) {
      this.loadProfile();
    }
  }

  enregistrerModification(): void {
    console.log('Enregistrer modification cliqué', this.utilisateur);
    const updateDto = {
      name: this.utilisateur.nomComplet,
      email: this.utilisateur.email,
      telephone: this.utilisateur.telephone,
      ville: this.utilisateur.ville,
      bio: this.utilisateur.bio
    };

    this.profilService.updateProfile(updateDto).subscribe({
      next: (response) => {
        console.log('Profil mis à jour avec succès :', response);
        this.modifierMode = false;
        this.loadProfile(); // Recharger les données actualisées
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil :', error);
        alert('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
      }
    });
  }

  cancelModification(): void {
    console.log('Annuler modification cliqué');
    this.modifierMode = false;
    this.loadProfile();
  }

  verifierTelephone() {
    console.log('Vérification téléphone lancée');
  }

  changerMotDePasse() {
    console.log('Changement mot de passe demandé');
  }

  desactiverCompte() {
    console.log('Désactivation du compte demandée');
  }
}
