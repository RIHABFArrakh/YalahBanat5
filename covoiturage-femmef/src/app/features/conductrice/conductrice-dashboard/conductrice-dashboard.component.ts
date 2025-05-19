import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { VoyageService, Voyage, VoyageDto, VoyageDto2 } from '../../../core/services/voyage.service';
import { ReservationService, Reservation } from '../../../core/services/reservation.service';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface VoyageForm {
  depart: string;
  destination: string;
  dateDepart: string;
  placesDisponibles: number;
  prix: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule,RouterModule],
  templateUrl: './conductrice-dashboard.component.html',
  styleUrls: ['./conductrice-dashboard.component.css']
})
export class ConductriceDashboardComponent implements OnInit {
  user: any; 
  userName = '';
  userRole = '';
  nomConductrice: string = '';
  totalTrips = 0;
  tripsThisMonth = 0;
  generatedRevenue = 0;
  averageRating = 0;
  totalRatings = 0;
  co2Saved = 0;
  treesEquivalent = 0;
  showModal: boolean = false;
  voyages: Voyage[] = [];
  reservations: Reservation[] = [];
  showAllTripsModal = false;
  selectedVoyageId: number | null = null;

  voyageForm: VoyageForm = {
    depart: '',
    destination: '',
    dateDepart: '',
    placesDisponibles: 1,
    prix: 0
  };

  reservationForm = {
    nombrePlaces: 1,
    voyageId: 0,
    passagerId: 2 // This should come from the logged-in user's ID
  };
   villesMarocaines: string[] = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
    'Agadir', 'Oujda', 'Meknès', 'Tétouan', 'Nador',
    'Khouribga', 'El Jadida', 'Safi', 'Beni Mellal', 'Kenitra',
    'Mohammedia', 'Errachidia', 'Laâyoune', 'Dakhla', 'Taroudant'
  ];
  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private voyageService: VoyageService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user data from AuthService
    const conductriceId = localStorage.getItem('conductriceId');
    if (conductriceId && Number(conductriceId) !== 0) {
      this.loadVoyagesByConductrice(Number(conductriceId));
    } else {
      console.error('ID de conductrice invalide ou non défini dans le localStorage.');
      alert('L\'ID de la conductrice est invalide. Veuillez vous reconnecter.');
      this.router.navigate(['/login']); 
    }

    this.nomConductrice = this.authService.getCurrentUser()?.name || 'Conductrice';

    this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.name || 'Utilisateur';
        this.userRole = user.role || '';
      }
    });
  }

  loadReservationHistory(userId: number) {
    this.reservationService.getReservationHistory(userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.reservationService.updateReservationsList(reservations);
      },
      error: (error) => {
        console.error('Error loading reservation history:', error);
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.voyageForm = {
      depart: '',
      destination: '',
      dateDepart: '',
      placesDisponibles: 1,
      prix: 0
    };
  }

  onSubmit() {
    const conductriceId = localStorage.getItem('conductriceId');
    if (!conductriceId || Number(conductriceId) === 0) {
      alert('ID de la conductrice invalide');
      return;
    }

    if (this.voyageForm.depart && this.voyageForm.destination && this.voyageForm.dateDepart) {
      const voyageData: VoyageDto2 = {
        depart: this.voyageForm.depart,
        destination: this.voyageForm.destination,
        dateDepart: this.voyageForm.dateDepart,
        placesDisponibles: this.voyageForm.placesDisponibles,
        price: this.voyageForm.prix,
        conductriceId: Number(conductriceId) // Ensure valid conductrice ID is sent
      };

      console.log('Données envoyées au backend :', voyageData); // Affiche les données envoyées

      this.voyageService.createVoyage(voyageData).subscribe({
        next: (res) => {
          // Ajouter le nouveau voyage à la liste
          this.voyageService.addVoyageToList(res);
          // Rafraîchir la liste des voyages
          this.loadVoyagesByConductrice(Number(conductriceId));
          this.closeModal();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de la création du voyage:', err);
          if (err.error && err.error.message) {
            alert('Erreur de création : ' + err.error.message);  // Afficher un message d'erreur détaillé
          } else {
            alert('Erreur inconnue lors de la création du voyage');
          }
        }
      });
    }
  }

  openAllTripsModal() {
    this.showAllTripsModal = true;
  }

  closeAllTripsModal() {
    this.showAllTripsModal = false;
  }

  openReservationModal(voyageId: number) {
    this.router.navigate(['/reservation', voyageId]);
  }

  editVoyage(voyageId: number) {
    // TODO: Implement edit functionality
    console.log('Edit voyage:', voyageId);
  }

  deleteVoyage(voyageId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      this.voyageService.deleteVoyage(voyageId).subscribe({
        next: () => {
          // Supprimer le voyage de la liste locale
          this.voyages = this.voyages.filter(v => v.id !== voyageId);
          // Afficher une alerte de succès
          alert('Voyage supprimé avec succès !');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du voyage :', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }

  loadVoyagesByConductrice(conductriceId: number) {
    this.voyageService.getVoyagesByConductrice(conductriceId).subscribe((voyages) => {
      console.log(voyages);
      this.voyages = voyages;
    });
  }
  
}