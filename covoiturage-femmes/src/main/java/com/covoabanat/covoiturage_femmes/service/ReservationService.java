package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.exceptions.email.SendingEmailException;
import com.covoabanat.covoiturage_femmes.model.*;
import com.covoabanat.covoiturage_femmes.repository.*;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Transactional
@Service
@RequiredArgsConstructor
public class ReservationService {

    private final VoyageRepository voyageRepository;
    private final PassagerRepository passagerRepository;
    private final ReservationRepository reservationRepository;
    private final ConductriceRepository conductriceRepository;
    @Autowired
    private EmailService emailService;


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

        StatutReservation statut = StatutReservation.valueOf(statutStr);
        reservation.setStatut(statut);

        // Only proceed with email if passager and user exist
        if (reservation.getPassager() != null && reservation.getPassager().getUser() != null) {
            User passager = reservation.getPassager().getUser();
            User conductrice = null;

            if (reservation.getVoyage() != null &&
                    reservation.getVoyage().getConductrice() != null &&
                    reservation.getVoyage().getConductrice().getUser() != null) {
                conductrice = reservation.getVoyage().getConductrice().getUser();
            }

            Map<String, String> emailVariables = new HashMap<>();
            String templatePath = null;
            String subject = null;

            switch (statut) {
                case ANNULEE:
                    templatePath = "templates/emails/reject-reservation-email.html";
                    subject = "Réservation refusée";
                    break;

                case CONFIRMEE:
                    templatePath = "templates/emails/accept-reservation-email.html";
                    subject = "Réservation acceptée";
                    break;

                case TERMINEE:
                    if (conductrice == null) {
                        throw new RuntimeException("Conductrice information missing for completed trip");
                    }
                    templatePath = "templates/emails/trip-completed-email.html";
                    subject = "Voyage terminé";
                    emailVariables.put("nomPassager", passager.getName());
                    emailVariables.put("nomConductrice", conductrice.getName());
                    String lienEvaluation = "http://localhost:4200/evaluation/"
                            + reservation.getVoyage().getId() + "/"
                            + reservation.getPassager().getId() + "/"
                            + reservation.getVoyage().getConductrice().getId();
                    emailVariables.put("lienEvaluation", lienEvaluation);
                    break;

                default:
                    break;
            }

            if (templatePath != null && subject != null) {
                try {
                    String emailContent = emailService.loadEmailTemplate(templatePath, emailVariables);
                    emailService.sendEmail(passager.getEmail(), subject, emailContent);
                } catch (MessagingException e) {
                    // Log the error but don't fail the whole operation
                    System.err.println("Failed to send email: " + e.getMessage());
                } catch (Exception e) {
                    System.err.println("Unexpected error sending email: " + e.getMessage());
                }
            }
        }

        return reservationRepository.save(reservation);
    }
    public List<Reservation> getReservationsByConductriceAndVoyage(Long conductriceId, Long voyageId) {
        return reservationRepository.findByConductriceIdAndVoyageId(conductriceId, voyageId);
    }




}
