package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.dto.UpdateUserProfileDTO;
import com.covoabanat.covoiturage_femmes.model.User;
import com.covoabanat.covoiturage_femmes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // ✅ Récupérer un utilisateur par email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    // ✅ Mettre à jour le profil d'un utilisateur connecté (via email)
    public User updateProfileByEmail(String email, UpdateUserProfileDTO dto) {
        User user = getUserByEmail(email);

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setTelephone(dto.getTelephone());
        user.setVille(dto.getVille());
        user.setBio(dto.getBio());

        return userRepository.save(user);
    }
}
