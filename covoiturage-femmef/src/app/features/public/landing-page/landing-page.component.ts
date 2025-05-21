import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  villes: string[] = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
    'Agadir', 'Oujda', 'Meknès', 'Tétouan', 'Laâyoune',
    'Nador', 'El Jadida', 'Khouribga', 'Béni Mellal', 'Safi',
    'Errachidia', 'Kénitra', 'Guelmim', 'Ouarzazate', 'Taza'
  ];

  depart: string = '';
  destination: string = '';
  date: string = '';
  passagers: number = 1;

  constructor(private router: Router) {}

  goToRecherche() {
    if (!this.depart || !this.destination) {
      alert('Veuillez remplir les champs départ et destination');
      return;
    }

    this.router.navigate(['/recherche'], {
      queryParams: {
        depart: this.depart,
        destination: this.destination,
        date: this.date,
        passagers: this.passagers
      }
    });
  }

  incrementPassagers() {
    this.passagers++;
  }

  decrementPassagers() {
    if (this.passagers > 1) {
      this.passagers--;
    }
  }
  
}
