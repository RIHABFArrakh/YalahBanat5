package com.covoabanat.covoiturage_femmes.model;

import jakarta.persistence.*;
import lombok.*;

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

}

