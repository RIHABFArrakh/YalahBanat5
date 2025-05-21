package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.model.Conductrice;
import com.covoabanat.covoiturage_femmes.model.Evaluation;
import com.covoabanat.covoiturage_femmes.repository.ConductriceRepository;
import com.covoabanat.covoiturage_femmes.repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    @Autowired
    private EvaluationRepository evaluationRepo;

    @Autowired
    private ConductriceRepository conductriceRepo;

    @PostMapping("/conductrices/{id}")
    public ResponseEntity<?> ajouterEvaluation(
            @PathVariable Long id, @RequestBody Evaluation evaluation) {
        Conductrice c = conductriceRepo.findById(id).orElseThrow();
        evaluation.setConductrice(c);
        evaluationRepo.save(evaluation);
        return ResponseEntity.ok("Évaluation enregistrée");
    }
}
