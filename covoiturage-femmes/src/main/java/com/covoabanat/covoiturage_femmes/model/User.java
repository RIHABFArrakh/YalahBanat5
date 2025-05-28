package com.covoabanat.covoiturage_femmes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    @JsonIgnore
    private String password;
    private String name;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String activationToken;
    private boolean enabled = false;
    private LocalDate membershipDate;
    private String telephone;
    private String ville;
    private String bio;
   
}
