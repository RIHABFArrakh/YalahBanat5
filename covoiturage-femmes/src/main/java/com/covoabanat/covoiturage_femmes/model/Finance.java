package com.covoabanat.covoiturage_femmes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class    Finance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montant;
    private String type; // "revenu", "retrait", etc.
    private LocalDate date;
    private String description;

    @ManyToOne
    @JoinColumn(name = "conductrice_id")
    @JsonIgnore
    private Conductrice conductrice; // Liaison avec la conductrice

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getMontant() { return montant; }
    public void setMontant(Double montant) { this.montant = montant; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Conductrice getConductrice() { return conductrice; }
    public void setConductrice(Conductrice conductrice) { this.conductrice = conductrice; }
}
