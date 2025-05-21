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

    // Obtenir l'historique des réservations d'un passager
    @GetMapping("/historique/{idPassager}")
    public List<Reservation> getHistoriqueReservations(@PathVariable Long idPassager) {
        return reservationService.getReservationsByPassagerId(idPassager);
    }

    // Réserver un voyage
        @PostMapping("/voyage/{voyageId}/passager/{passagerId}")
    public ResponseEntity<Reservation> reserverVoyage(
            @PathVariable Long voyageId,
            @PathVariable Long passagerId,
            @RequestParam int nombrePlaces
    ) {
        Reservation reservation =    reservationService.reserverVoyage(voyageId, passagerId, nombrePlaces);
        return ResponseEntity.ok(reservation);
    }
}
