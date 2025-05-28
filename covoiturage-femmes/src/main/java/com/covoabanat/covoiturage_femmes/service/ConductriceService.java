package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.Conductrice;
import com.covoabanat.covoiturage_femmes.repository.ConductriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// ConductriceService.java
@Service
public class ConductriceService {
    @Autowired
    private ConductriceRepository conductriceRepository;

    public Conductrice getByUserId(Long userId) {
        return conductriceRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Conductrice not found for user ID: " + userId));
    }

}
