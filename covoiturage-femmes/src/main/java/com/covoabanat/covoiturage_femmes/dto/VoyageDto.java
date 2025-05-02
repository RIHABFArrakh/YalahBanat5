package com.covoabanat.covoiturage_femmes.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VoyageDto {

    @NotBlank(message = "Le lieu de départ ne doit pas être vide")
    private String depart;

    @NotBlank(message = "La destination ne doit pas être vide")
    private String destination;

    @NotNull(message = "La date et l'heure doivent être spécifiées")
    @Future(message = "La date et l'heure doivent être dans le futur")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime dateHeure;

    @Min(value = 1, message = "Le nombre de places disponibles doit être au moins 1")
    private int placesDisponibles;

    @NotNull(message = "Le prix est requis")
    private double price;

    @NotNull(message = "L'ID de la conductrice est requis")
    private Long conductriceId;

    // Getters and Setters
}
