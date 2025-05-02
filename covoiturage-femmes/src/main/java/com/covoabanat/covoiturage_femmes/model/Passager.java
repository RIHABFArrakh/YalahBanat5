package com.covoabanat.covoiturage_femmes.model;

import jakarta.persistence.*;
import lombok.*;

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

    private String address;
    private String phone;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}
