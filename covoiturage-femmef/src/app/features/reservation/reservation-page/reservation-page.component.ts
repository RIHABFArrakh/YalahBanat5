import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyageService } from '../../../core/services/voyage.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reservation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-[#fdfbff] px-4 py-8">
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Réserver un trajet</h1>
          <button (click)="goBack()" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div *ngIf="voyage" class="space-y-6">
          <!-- Voyage Details -->
          <div class="bg-purple-50 rounded-lg p-4">
            <h2 class="text-lg font-semibold text-purple-800 mb-2">Détails du trajet</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Départ</p>
                <p class="font-medium">{{ voyage.depart }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Destination</p>
                <p class="font-medium">{{ voyage.destination }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Date et heure</p>
                <p class="font-medium">{{ voyage.dateHeure | date:'medium' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Prix par place</p>
                <p class="font-medium">{{ voyage.price }} DH</p>
              </div>
            </div>
          </div>

          <!-- Reservation Form -->
          <form (ngSubmit)="submitReservation()" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de places</label>
              <input type="number" [(ngModel)]="nombrePlaces" name="nombrePlaces" required min="1"
                     [max]="voyage.placesDisponibles"
                     class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                     placeholder="Ex: 2">
              <p class="text-sm text-gray-500 mt-1">Places disponibles: {{ voyage.placesDisponibles }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Récapitulatif</h3>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total à payer:</span>
                <span class="text-xl font-bold text-purple-600">{{ nombrePlaces * voyage.price }} DH</span>
              </div>
            </div>

            <div class="flex justify-end gap-4">
              <button type="button" (click)="goBack()"
                      class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit"
                      [disabled]="!nombrePlaces || nombrePlaces > voyage.placesDisponibles"
                      class="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed">
                Confirmer la réservation
              </button>
            </div>
          </form>
        </div>

        <div *ngIf="!voyage" class="text-center py-8">
          <p class="text-gray-500">Chargement des détails du trajet...</p>
        </div>
      </div>
    </div>
  `
})
export class ReservationPageComponent implements OnInit {
  voyage: any = null;
  nombrePlaces: number = 1;
  voyageId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voyageService: VoyageService,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.voyageId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadVoyageDetails();
  }

  loadVoyageDetails() {
    this.voyageService.getVoyageById(this.voyageId).subscribe({
      next: (voyage) => {
        this.voyage = voyage;
      },
      error: (error) => {
        console.error('Error loading voyage details:', error);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  submitReservation() {
    if (this.voyage && this.nombrePlaces) {
      const passagerId = 2; // This should come from the logged-in user
      this.reservationService.createReservation(
        this.voyageId,
        passagerId,
        this.nombrePlaces
      ).subscribe({
        next: (response) => {
          // Show success message and redirect
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
} 