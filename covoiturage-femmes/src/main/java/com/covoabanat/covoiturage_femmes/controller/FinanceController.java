package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/finances")
@CrossOrigin(origins = "*")
public class FinanceController {

    private final FinanceService financeService;

    @Autowired
        public FinanceController(FinanceService financeService) {
            this.financeService = financeService;
        }

        // Récupérer le total des finances pour une conductrice spécifique
        @GetMapping("/total/{conductriceId}")
        public ResponseEntity<Double> getTotalByConductrice(@PathVariable Long conductriceId) {
            Double total = financeService.getTotalByConductriceId(conductriceId);
            if (total != null) {
                return ResponseEntity.ok(total);  // Retourne le total trouvé
            } else {
                return ResponseEntity.notFound().build();  // Retourne 404 si aucun total trouvé
            }
        }
}
