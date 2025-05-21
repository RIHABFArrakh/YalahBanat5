package com.covoabanat.covoiturage_femmes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation")
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
    @JsonIgnore
    private Voyage voyage;

    @Column(nullable = false)
    private int nombrePlaces;

    // Constructeur personnalisé
    public Reservation(Voyage voyage, Passager passager, int nombrePlaces) {
        this.voyage = voyage;
        this.passager = passager;
        this.dateReservation = LocalDateTime.now();
        this.statut = StatutReservation.EN_ATTENTE;
        this.nombrePlaces = nombrePlaces;
    }
}
