package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.Passager;
import com.covoabanat.covoiturage_femmes.repository.PassagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PassagerService {

    @Autowired
    private PassagerRepository passagerRepository;

    public Passager getByUserId(Long userId) {
        return passagerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Passager not found for user ID: " + userId));
    }
}
