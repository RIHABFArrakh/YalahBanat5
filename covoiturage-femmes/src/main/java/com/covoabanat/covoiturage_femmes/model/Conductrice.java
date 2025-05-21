package com.covoabanat.covoiturage_femmes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "conductrices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conductrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String voiture;
    private String numeroPermis;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "conductrice")
    private List<Finance> finances; // Liste des finances liées à la conductrice


}

