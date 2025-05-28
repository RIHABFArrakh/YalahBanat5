package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.dto.UpdateUserProfileDTO;
import com.covoabanat.covoiturage_femmes.dto.UserProfileDTO;
import com.covoabanat.covoiturage_femmes.model.User;
import com.covoabanat.covoiturage_femmes.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ✅ Récupérer le profil de l'utilisateur connecté
    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getCurrentUserProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(UserProfileDTO.fromUser(user));
    }

    // ✅ Mettre à jour le profil de l'utilisateur connecté
    @PutMapping("/me")
    public ResponseEntity<UserProfileDTO> updateCurrentUserProfile(
            @RequestBody UpdateUserProfileDTO dto,
            Authentication authentication) {

        String email = authentication.getName();
        User updatedUser = userService.updateProfileByEmail(email, dto);
        return ResponseEntity.ok(UserProfileDTO.fromUser(updatedUser));
    }
}
