package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.Voyage;
import com.covoabanat.covoiturage_femmes.repository.VoyageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoyageService {

    private final VoyageRepository voyageRepository;

    public Voyage creerVoyage(Voyage voyage) {
        return voyageRepository.save(voyage);
    }

    public List<Voyage> listerVoyages() {
        return voyageRepository.findAll();
    }

    public Optional<Voyage> obtenirVoyageParId(Long id) {
        return voyageRepository.findById(id);
    }

    public void supprimerVoyage(Long id) {
        voyageRepository.deleteById(id);
    }

    public List<Voyage> listerVoyagesParConductrice(Long conductriceId) {
        return voyageRepository.findByConductriceId(conductriceId);
    }
}
