import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../core/services/reservation.service';

@Component({
  selector: 'app-reservation-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-popup.component.html'
})
export class ReservationPopupComponent {
  places = 1;
  maxPlaces = 3;
   
  paymentMethod: string = '';
  
  @Input() voyage: any;

  @Output() closed = new EventEmitter<void>();

  constructor(private reservationService: ReservationService) {}

  increment() {
    if (this.places < this.maxPlaces) this.places++;
  }

  decrement() {
    if (this.places > 1) this.places--;
  }

  closePopup() {
    this.closed.emit();
  }

  confirmReservation() {
    // Get the current user ID from localStorage or your auth service
    const userId = 1; // Replace with actual user ID from your auth system
    
    this.reservationService.createReservation({
      voyageId: this.voyage.id,
      passagerId: userId,
      nombrePlaces: this.places
    }).subscribe({
      next: (response) => {
        alert('Réservation confirmée avec succès!');
        this.closePopup();
      },
      error: (error) => {
        console.error('Erreur lors de la réservation:', error);
        alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
      }
    });
  }

  selectPayment(method: string) {
    this.paymentMethod = method;
  }
}