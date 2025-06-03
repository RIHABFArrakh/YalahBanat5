import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Reservation } from '../../../core/models/reservation.model';
import { ReservationService } from '../../../core/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  isLoading: boolean = false;
  constructor(private reservationService: ReservationService,private route: ActivatedRoute,private toastr: ToastrService) {}

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
    this.isLoading=true;
  this.reservationService.updateStatutReservation(reservation.id, nouveauStatut)
    .subscribe((updatedReservation) => {
      this.isLoading=false;
      reservation.statut = updatedReservation.statut;
 switch (updatedReservation.statut) {
          case 'CONFIRMEE':
            this.toastr.success('La réservation a été acceptée et lemail a ete envoye au passagere', 'Confirmation');
            break;
          case 'ANNULEE':
            this.toastr.warning('La réservation a été refusée et lemail a ete envoye au passagere.', 'Annulation');
            break;
          case 'TERMINEE':
            this.toastr.info('Le voyage est terminé. et l email devaluation a ete envoye au passagere', 'Information');
            break;
          default:
            this.toastr.success('Statut mis à jour avec succès.', 'Succès');
        }
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
