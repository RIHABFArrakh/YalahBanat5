import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { VoyageService, Voyage } from '../../../core/services/voyage.service';
import { Reservation, Passager } from '../../../core/models/reservation.model';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-passager-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passager-dashboard.component.html',
  styleUrls: ['./passager-dashboard.component.css']
})
export class PassagerDashboardComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  totalTrips: number = 0;
  showModal: boolean = false;
  errorMessage: string = '';
  currentUserId: number = 0;
  voyages: Voyage[] = [];
  availableCities: string[] = [];
  reservationHistory: Reservation[] = [];
  showDetails = false;

  passager: Passager | null = null;

  reservationForm = {
    depart: '',
    destination: '',
    dateHeure: '',
    places: 1,
    prix: 0
  };

  // Pagination
  currentPage = 1;
  pageSize = 5;

  get paginatedReservations(): Reservation[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.reservationHistory.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.reservationHistory.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reservationService: ReservationService,
    private voyageService: VoyageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.name || 'Passager';
        this.userRole = user.role || '';
        this.currentUserId = user.id;

        this.loadReservationHistory(user.id);

        this.userService.getPassagerByUserId(user.id).subscribe({
          next: (data) => {
            this.passager = data;
          },
          error: (err) => {
            console.error("Erreur lors du chargement du passager :", err);
            this.errorMessage = "Erreur lors du chargement des données. Veuillez réessayer.";
          }
        });
      }
    });

    this.loadVoyages();
  }

  loadVoyages() {
    this.voyageService.getVoyages().subscribe({
      next: (voyages) => {
        this.voyages = voyages;
        this.availableCities = this.extractUniqueCities(voyages);
      },
      error: (error: any) => {
        console.error('Error loading voyages:', error);
      }
    });
  }

  private extractUniqueCities(voyages: Voyage[]): string[] {
    const cities = new Set<string>();
    voyages.forEach(voyage => {
      cities.add(voyage.depart.toLowerCase());
      cities.add(voyage.destination.toLowerCase());
    });
    return Array.from(cities).sort();
  }

  openModal(): void {
    this.showModal = true;
    // Set default values from first available voyage if exists
    if (this.voyages.length > 0) {
      const firstVoyage = this.voyages[0];
      this.reservationForm = {
        depart: firstVoyage.depart,
        destination: firstVoyage.destination,
        dateHeure: firstVoyage.dateDepart,
        places: 1,
        prix: firstVoyage.prix
      };
    } else {
      this.reservationForm = {
        depart: '',
        destination: '',
        dateHeure: '',
        places: 1,
        prix: 0
      };
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitReservation(): void {
    if (!this.currentUserId) {
      alert('Veuillez vous connecter pour effectuer une réservation.');
      this.router.navigate(['/login']);
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Votre session a expiré. Veuillez vous reconnecter.');
      this.router.navigate(['/login']);
      return;
    }

    // Format the date from the form to match the database format
    const formattedDate = new Date(this.reservationForm.dateHeure).toISOString().slice(0, 16);

    // Find the matching voyage
    const matchingVoyage = this.voyages.find(v => {
      const voyageDate = new Date(v.dateDepart).toISOString().slice(0, 16);
      const isMatch = v.depart.toLowerCase() === this.reservationForm.depart.toLowerCase() && 
                     v.destination.toLowerCase() === this.reservationForm.destination.toLowerCase() &&
                     voyageDate === formattedDate;

      // Debug logging
      console.log('Comparing voyage:', {
        voyage: v,
        formData: this.reservationForm,
        voyageDate,
        formattedDate,
        isMatch
      });

      return isMatch;
    });

    if (!matchingVoyage) {
      console.log('Available voyages:', this.voyages);
      console.log('Form data:', this.reservationForm);
      alert('Aucun voyage correspondant trouvé. Veuillez vérifier les détails.');
      return;
    }

    // Create the reservation
    this.reservationService.createReservation({
      voyageId: matchingVoyage.id,
      passagerId: this.currentUserId,
      nombrePlaces: this.reservationForm.places
    }).subscribe({
      next: (response) => {
        console.log('Reservation created successfully:', response);
        alert('Réservation confirmée avec succès!');
        this.closeModal();
        // Optionally refresh the voyages list
        this.loadVoyages();
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
        if (error.status === 403) {
          alert('Votre session a expiré. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        } else {
          alert('Erreur lors de la création de la réservation. Veuillez réessayer.');
        }
      }
    });
  }

  calculateTotal(): number {
    return this.reservationForm.places * this.reservationForm.prix;
  }

  loadReservationHistory(userId: number) {
    this.reservationService.getReservationHistory(userId).subscribe({
      next: (reservations) => {
        console.log('Reservation history loaded:', reservations);
        this.reservationHistory = reservations;
        this.totalTrips = reservations.length;
      },
      error: (error) => {
        console.error('Error loading reservation history:', error);
        this.errorMessage = "Erreur lors du chargement de l'historique des réservations.";
      }
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
