package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.Voyage;
import com.covoabanat.covoiturage_femmes.repository.VoyageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinanceService {

    @Autowired
    private VoyageRepository voyageRepository;

    public Double getTotalByConductriceId(Long conductriceId) {
        List<Voyage> voyages = voyageRepository.findByConductriceId(conductriceId);
        return voyages.stream()
                .mapToDouble(Voyage::getPrix)  // Assure-toi que getPrix() retourne bien un Double
                .sum();
    }
}

