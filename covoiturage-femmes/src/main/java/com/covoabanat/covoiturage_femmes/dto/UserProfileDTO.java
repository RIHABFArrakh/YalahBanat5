package com.covoabanat.covoiturage_femmes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private String name;
    private String email;
    private String telephone;
    private String ville;
    private String bio;

    // Méthode statique pour créer un DTO à partir d'un User
    public static UserProfileDTO fromUser(com.covoabanat.covoiturage_femmes.model.User user) {
        return new UserProfileDTO(
                user.getName(),
                user.getEmail(),
                user.getTelephone(),
                user.getVille(),
                user.getBio()
        );
    }
}
