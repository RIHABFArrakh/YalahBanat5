package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.*;
import com.covoabanat.covoiturage_femmes.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Transactional
@Service
@RequiredArgsConstructor
public class ReservationService {

    private final VoyageRepository voyageRepository;
    private final PassagerRepository passagerRepository;
    private final ReservationRepository reservationRepository;
    private final ConductriceRepository conductriceRepository;


    // Récupérer les réservations d’un passager
    public List<Reservation> getReservationsByPassagerId(Long idPassager) {
        List<Reservation> reservations = reservationRepository.findByPassagerId(idPassager);
        if (reservations.isEmpty()) {
            throw new RuntimeException("Aucune réservation trouvée pour le passager avec l'id: " + idPassager);
        }
        return reservations;
    }

    // Réserver un voyage
    public Reservation reserverVoyage(Long voyageId, Long passagerId, int nombrePlaces) {
        Voyage voyage = voyageRepository.findById(voyageId)
                .orElseThrow(() -> new RuntimeException("Voyage non trouvé"));

        Passager passager = passagerRepository.findById(passagerId)
                .orElseThrow(() -> new RuntimeException("Passager non trouvé"));

        if (voyage.getPlacesDisponibles() < nombrePlaces) {
            throw new RuntimeException("Pas assez de places disponibles");
        }

        voyage.setPlacesDisponibles(voyage.getPlacesDisponibles() - nombrePlaces);
        voyageRepository.save(voyage);

        Reservation reservation = new Reservation(voyage, passager, nombrePlaces);
        return reservationRepository.save(reservation);
    }
    public List<Reservation> getReservationsByAuthenticatedPassager(String email) {
        Passager passager = passagerRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Passager non trouvé pour l'utilisateur connecté"));

        List<Reservation> reservations = reservationRepository.findByPassagerId(passager.getId());
        if (reservations.isEmpty()) {
            throw new RuntimeException("Aucune réservation trouvée pour le passager avec l'id: " + passager.getId());
        }
        return reservations;
    }
    // ReservationService.java
    public void confirmerReservation(Long reservationId, Long conductriceId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID : " + reservationId));

        if (!reservation.getVoyage().getConductrice().getId().equals(conductriceId)) {
            throw new RuntimeException("La conductrice n'est pas autorisée à confirmer cette réservation.");
        }

        reservation.setStatut(StatutReservation.CONFIRMEE);
        reservationRepository.save(reservation);
    }
    public List<Reservation> getReservationsByConductrice(Long conductriceId) {
        return reservationRepository.findByConductriceId(conductriceId);
    }
    public Reservation updateStatut(Long id, String statutStr) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));

        StatutReservation statut = StatutReservation.valueOf(statutStr); // Peut lancer IllegalArgumentException
        reservation.setStatut(statut);

        return reservationRepository.save(reservation);
    }
    public List<Reservation> getReservationsByConductriceAndVoyage(Long conductriceId, Long voyageId) {
        return reservationRepository.findByConductriceIdAndVoyageId(conductriceId, voyageId);
    }



}
