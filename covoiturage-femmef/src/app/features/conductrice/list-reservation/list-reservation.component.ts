import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Reservation } from '../../../core/models/reservation.model';
import { ReservationService } from '../../../core/services/reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-reservation',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.css',
  providers: [ReservationService]
})
export class ListReservationComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    const conductriceId = +this.route.snapshot.paramMap.get('conductriceId')!;
    const voyageId = +this.route.snapshot.paramMap.get('voyageId')!;

    this.reservationService.getReservationsOfVoyageByConductrice(conductriceId, voyageId)
      .subscribe({
        next: (data) => this.reservations = data,
        error: (err) => console.error('Erreur lors du chargement des réservations', err)
      });
  }
  changerStatut(reservation: Reservation, nouveauStatut: string): void {
  this.reservationService.updateStatutReservation(reservation.id, nouveauStatut)
    .subscribe((updatedReservation) => {
      reservation.statut = updatedReservation.statut;
    });
}

getStatutLabel(statut: string): string {
  switch (statut) {
    case 'EN_ATTENTE':
      return 'En attente';
    case 'CONFIRMEE':
      return 'Confirmée';
    case 'ANNULEE':
      return 'Annulée';
    case 'TERMINEE':
      return 'Terminée';
    default:
      return 'Statut inconnu';
  }
}

}
