package com.covoabanat.covoiturage_femmes.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateReservation;

    @Enumerated(EnumType.STRING)
    private StatutReservation statut;

    @ManyToOne
    @JoinColumn(name = "passager_id")
    private Passager passager;

    @ManyToOne
    @JoinColumn(name = "voyage_id")
    private Voyage voyage;

    // Si tu veux forcer une initialisation via un constructeur spécifique :
    public Reservation(Voyage voyage, Passager passager) {
        this.voyage = voyage;
        this.passager = passager;
        this.dateReservation = LocalDateTime.now();  // Par exemple, initialiser la date à l'instant présent
        this.statut = StatutReservation.EN_ATTENTE;  // ou un statut par défaut
    }
}
