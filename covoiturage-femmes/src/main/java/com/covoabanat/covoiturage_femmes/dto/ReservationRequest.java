package com.covoabanat.covoiturage_femmes.dto;
import lombok.Data;

@Data
public class ReservationRequest {
    private Long passagerId;
    private Long voyageId;
    private int nombrePlaces;

    // getters & setters
}
