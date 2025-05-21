package com.covoabanat.covoiturage_femmes.dto;

import java.time.LocalDate;

public class FinanceDTO {

    private Long id;
    private Double montant;
    private String type;
    private LocalDate date;
    private String description;
    private Long conductriceId;  // ID de la conductrice

    // Getters et Setters
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

    public Long getConductriceId() { return conductriceId; }
    public void setConductriceId(Long conductriceId) { this.conductriceId = conductriceId; }
}
