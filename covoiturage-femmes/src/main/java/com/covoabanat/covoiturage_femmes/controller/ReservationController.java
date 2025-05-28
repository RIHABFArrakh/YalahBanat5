package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.model.Reservation;
import com.covoabanat.covoiturage_femmes.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // Obtenir l'historique des réservations d'un passager
    @GetMapping("/historique")
    public ResponseEntity<List<Reservation>> getHistoriqueReservations(Authentication authentication) {
        String email = authentication.getName(); // L’email ou username du passager connecté
        List<Reservation> reservations = reservationService.getReservationsByAuthenticatedPassager(email);
        return ResponseEntity.ok(reservations);
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
    @PutMapping("/{id}/confirmer")
    public ResponseEntity<?> confirmerReservation(@PathVariable Long id,
                                                  @RequestParam Long conductriceId) {
        try {
            reservationService.confirmerReservation(id, conductriceId);
            return ResponseEntity.ok("Réservation confirmée avec succès.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Récupérer toutes les réservations associées à une conductrice
    @GetMapping("/conductrice/{id}")
    public ResponseEntity<List<Reservation>> getReservationsByConductrice(@PathVariable Long id) {
        List<Reservation> reservations = reservationService.getReservationsByConductrice(id);
        return ResponseEntity.ok(reservations);
    }
    @PatchMapping("/{id}/statut/{statut}")
    public ResponseEntity<Reservation> updateStatutReservation(
            @PathVariable Long id,
            @PathVariable String statut) {
        try {
            Reservation updatedReservation = reservationService.updateStatut(id, statut.toUpperCase());
            return ResponseEntity.ok(updatedReservation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Statut invalide
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Récupérer les réservations d'une conductrice pour un voyage spécifique
    @GetMapping("/conductrice/{conductriceId}/voyage/{voyageId}")
    public ResponseEntity<List<Reservation>> getReservationsByConductriceAndVoyage(
            @PathVariable Long conductriceId,
            @PathVariable Long voyageId) {

        List<Reservation> reservations = reservationService.getReservationsByConductriceAndVoyage(conductriceId, voyageId);
        return ResponseEntity.ok(reservations);
    }


}


