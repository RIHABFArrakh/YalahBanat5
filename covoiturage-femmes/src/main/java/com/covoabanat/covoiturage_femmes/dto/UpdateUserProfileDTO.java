package com.covoabanat.covoiturage_femmes.dto;

import lombok.Data;

@Data
public class UpdateUserProfileDTO {
    private String name;
    private String email;
    private String telephone;
    private String ville;
    private String bio;
}
