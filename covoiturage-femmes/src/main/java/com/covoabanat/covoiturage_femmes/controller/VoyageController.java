package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.dto.VoyageDto;
import com.covoabanat.covoiturage_femmes.model.Conductrice;
import com.covoabanat.covoiturage_femmes.model.Voyage;
import com.covoabanat.covoiturage_femmes.repository.ConductriceRepository;
import com.covoabanat.covoiturage_femmes.service.VoyageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/voyages")
@RequiredArgsConstructor
public class VoyageController {

    @Autowired
    private final VoyageService voyageService;

    @Autowired
    private final ConductriceRepository conductriceRepository;

    @PostMapping
    public ResponseEntity<Voyage> creerVoyage(@Valid @RequestBody VoyageDto voyageDto) {
        Voyage voyage = new Voyage();
        voyage.setDepart(voyageDto.getDepart());
        voyage.setDestination(voyageDto.getDestination());
        voyage.setDateDepart(voyageDto.getDateDepart()); //

        voyage.setPrix(voyageDto.getPrice());
        voyage.setPlacesDisponibles(voyageDto.getPlacesDisponibles());
        Conductrice conductrice = conductriceRepository.findById(voyageDto.getConductriceId())
                .orElseThrow(() -> new RuntimeException("Conductrice not found with id: " + voyageDto.getConductriceId()));
        voyage.setConductrice(conductrice);

        Voyage nouveauVoyage = voyageService.creerVoyage(voyage);
        return ResponseEntity.ok(nouveauVoyage);
    }

    @GetMapping
    public ResponseEntity<List<Voyage>> listerVoyages() {
        return ResponseEntity.ok(voyageService.listerVoyages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voyage> obtenirVoyageParId(@PathVariable Long id) {
        return voyageService.obtenirVoyageParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/recherche")
    public ResponseEntity<List<Voyage>> rechercherVoyages(
            @RequestParam String depart,
            @RequestParam String destination,
            @RequestParam String dateDepart) {

        System.out.println("depart=" + depart + ", destination=" + destination + ", dateDepart=" + dateDepart);

        LocalDate dateTime;
        try {
            dateTime = LocalDate.parse(dateDepart);
        } catch (DateTimeParseException e) {
            System.err.println("Erreur parsing date: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }

        List<Voyage> voyages = voyageService.rechercherVoyages(depart, destination, dateTime);
        return ResponseEntity.ok(voyages);
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerVoyage(@PathVariable Long id) {
        voyageService.supprimerVoyage(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/conductrice/{id}")
    public List<Voyage> getVoyagesByConductriceId(@PathVariable("id") Long conductriceId) {
        return voyageService.getVoyagesByConductriceId(conductriceId);
    }
}