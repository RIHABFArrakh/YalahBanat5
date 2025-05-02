package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.*;
import com.covoabanat.covoiturage_femmes.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final VoyageRepository voyageRepository;
    private final PassagerRepository passagerRepository;
    private final ReservationRepository reservationRepository;

    // Méthode pour récupérer les réservations par l'ID du passager
    public List<Reservation> getReservationsByPassagerId(Long idPassager) {
        List<Reservation> reservations = reservationRepository.findByPassagerId(idPassager);

        // Vérifie si la liste de réservations est vide et lève une exception si c'est le cas
        if (reservations.isEmpty()) {
            throw new RuntimeException("Aucune réservation trouvée pour le passager avec l'id: " + idPassager);
        }

        return reservations;
    }

    // Méthode pour réserver un voyage
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

        Reservation reservation = new Reservation(voyage, passager);
        return reservationRepository.save(reservation);
    }
}
