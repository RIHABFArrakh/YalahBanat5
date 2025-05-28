import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { VoyageService, Voyage, VoyageDto2 } from '../../../core/services/voyage.service';
import { ReservationService, Reservation } from '../../../core/services/reservation.service';
import { ProfilService } from '../../../core/services/profil.service';
import { Conductrice } from '../../../core/models/conductrice.model';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  voiture?: string;
  numeroPermis?: string;
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
  imports: [CommonModule, NavbarComponent, FormsModule, RouterModule],
  templateUrl: './conductrice-dashboard.component.html',
  styleUrls: ['./conductrice-dashboard.component.css']
})
export class ConductriceDashboardComponent implements OnInit {
  user: any;
  userName = '';
  userRole = '';
  nomConductrice: string = '';
  conductrice?: Conductrice; // ✅ Ajouté pour le template
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
  showDetails = false;
  isLoading = true;
  afficherReservations = false;


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
    passagerId: 2 // à remplacer dynamiquement si besoin
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
    private profilService: ProfilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    const conductriceId = localStorage.getItem('conductriceId');
    if (conductriceId && Number(conductriceId) != 0) {
      this.loadVoyagesByConductrice(Number(conductriceId));
    } else {
      console.error('ID de conductrice invalide ou non défini dans le localStorage.');
      alert('L\'ID de la conductrice est invalide. Veuillez vous reconnecter.');
      this.router.navigate(['/login']);
    }
    this.user = this.authService.getCurrentUser()
    console.log(this.user)
    this.userService.getConductriceByUserId(this.user.id).subscribe({
      next: (data) => {
        console.log(data)
        this.conductrice = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement conductrice :', err);
        this.isLoading = false;

      },
    });

  }

  loadReservationHistory(userId: number) {
    this.reservationService.getReservationHistory(userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.reservationService.updateReservationsList(reservations);
      },
      error: (error) => {
        console.error('Erreur chargement historique réservations:', error);
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
        conductriceId: Number(conductriceId)
      };

      this.voyageService.createVoyage(voyageData).subscribe({
        next: (res) => {
          this.voyageService.addVoyageToList(res);
          this.loadVoyagesByConductrice(Number(conductriceId));
          this.closeModal();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de la création du voyage:', err);
          alert(err.error?.message || 'Erreur inconnue');
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
    console.log('Edit voyage:', voyageId);
  }

  deleteVoyage(voyageId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      this.voyageService.deleteVoyage(voyageId).subscribe({
        next: () => {
          this.voyages = this.voyages.filter(v => v.id !== voyageId);
          alert('Voyage supprimé avec succès !');
        },
        error: (error) => {
          console.error('Erreur suppression voyage :', error);
          alert('Erreur lors de la suppression.');
        }
      });
    }
  }

  loadVoyagesByConductrice(conductriceId: number) {
    this.voyageService.getVoyagesByConductrice(conductriceId).subscribe((voyages) => {
      this.voyages = voyages;
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  goToReservations(voyageId: number): void {
    const conductriceId = localStorage.getItem('conductriceId');
    this.router.navigate(['/reservations', conductriceId, voyageId]);
  }
}
