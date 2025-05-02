package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.model.Reservation;
import com.covoabanat.covoiturage_femmes.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // Méthode pour obtenir l'historique des réservations d'un passager
    @GetMapping("/historique/{idPassager}")
    public List<Reservation> getHistoriqueReservations(@PathVariable Long idPassager) {
        return reservationService.getReservationsByPassagerId(idPassager);
    }

    // Nouvelle méthode pour réserver un voyage
    @PostMapping("/voyage/{voyageId}/passager/{passagerId}")
    public ResponseEntity<Reservation> reserverVoyage(
            @PathVariable Long voyageId,
            @PathVariable Long passagerId,
            @RequestParam int nombrePlaces
    ) {
        // Appel du service pour créer la réservation
        Reservation reservation = reservationService.reserverVoyage(voyageId, passagerId, nombrePlaces);

        // Retourner la réservation créée avec le statut HTTP 200 (OK)
        return ResponseEntity.ok(reservation);
    }
}
