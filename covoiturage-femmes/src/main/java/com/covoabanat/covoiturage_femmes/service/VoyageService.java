package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.model.Voyage;
import com.covoabanat.covoiturage_femmes.repository.VoyageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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


    public List<Voyage> rechercherVoyages(String depart, String destination, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay(); // 00:00
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX); // 23:59:59.999999999

        return voyageRepository.findByDepartAndDestinationAndDateDepartBetween(depart, destination, startOfDay, endOfDay);
    }

    public List<Voyage> getVoyagesByConductriceId(Long conductriceId) {
        return voyageRepository.findByConductriceId(conductriceId);
    }

}