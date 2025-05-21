package com.covoabanat.covoiturage_femmes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    //  @ManyToOne
    //    @JoinColumn(name = "destination_id")
    //    private City city;
    //
    //    @ManyToOne
    //    @JoinColumn(name = "depart_id")
    //    private City city;
    //
    //avec l ajout dune entite city

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "conductrice_id")
    private Conductrice conductrice;

    @OneToMany(mappedBy = "voyage", cascade = CascadeType.ALL)
    private List<Reservation> reservations;
}