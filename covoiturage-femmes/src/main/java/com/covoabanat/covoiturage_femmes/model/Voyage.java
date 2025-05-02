package com.covoabanat.covoiturage_femmes.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voyage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String depart;
    private String destination;
    private LocalDateTime dateDepart;
    private int placesDisponibles;
    private double prix;

    @ManyToOne
    @JoinColumn(name = "conductrice_id")
    private Conductrice conductrice;

    @OneToMany(mappedBy = "voyage", cascade = CascadeType.ALL)
    private List<Reservation> reservations;
}
