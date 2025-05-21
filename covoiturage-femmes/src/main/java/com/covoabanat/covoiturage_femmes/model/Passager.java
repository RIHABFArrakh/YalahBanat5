package com.covoabanat.covoiturage_femmes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "passagers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String address;
    private String phone;
    @Column(name = "membership_date")
    private LocalDate membershipDate;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;
}
