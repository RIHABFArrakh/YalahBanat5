package com.covoabanat.covoiturage_femmes.dto;


import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // Peut être "CLIENT" (Passager) ou "CONDUCTRICE"
}



