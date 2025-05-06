import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { VoyageService, Voyage } from '../../../core/services/voyage.service';
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
  date_heure: string;
  places_disponibles: number;
  price: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './conductrice-dashboard.component.html',
  styleUrls: ['./conductrice-dashboard.component.css']
})
export class ConductriceDashboardComponent implements OnInit {
  userName = '';
  userRole = '';
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
    date_heure: '',
    places_disponibles: 1,
    price: 0
  };

  reservationForm = {
    nombrePlaces: 1,
    voyageId: 0,
    passagerId: 2 // This should come from the logged-in user's ID
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private voyageService: VoyageService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user data from AuthService
    this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.name || 'Utilisateur';
        this.userRole = user.role || '';
        // Load reservation history for the user
        this.loadReservationHistory(user.id);
      }
    });

    this.userService.getDashboardData().subscribe((data: any) => {
      this.totalTrips = data.totalTrips;
      this.tripsThisMonth = data.tripsThisMonth;
      this.generatedRevenue = data.generatedRevenue;
      this.averageRating = data.averageRating;
      this.totalRatings = data.totalRatings;
      this.co2Saved = data.co2Saved;
      this.treesEquivalent = data.treesEquivalent;
    });

    // Subscribe to voyages updates
    this.voyageService.voyages$.subscribe(voyages => {
      this.voyages = voyages;
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
      date_heure: '',
      places_disponibles: 1,
      price: 0
    };
  }

  onSubmit() {
    if (this.voyageForm.depart && this.voyageForm.destination && this.voyageForm.date_heure) {
      const voyageData: Voyage = {
        depart: this.voyageForm.depart,
        destination: this.voyageForm.destination,
        dateHeure: this.voyageForm.date_heure,
        placesDisponibles: this.voyageForm.places_disponibles,
        price: this.voyageForm.price,
        conductriceId: 1 // This should be replaced with the actual conductrice ID
      };

      this.voyageService.createVoyage(voyageData).subscribe({
        next: (res) => {
          this.voyageService.addVoyageToList(res);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating voyage:', err);
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
}
