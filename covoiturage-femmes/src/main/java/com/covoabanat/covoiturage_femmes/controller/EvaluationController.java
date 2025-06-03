package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.model.Evaluation;
import com.covoabanat.covoiturage_femmes.service.EvaluationService;
import com.covoabanat.covoiturage_femmes.service.EvaluationService.EvaluationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/evaluations")
@CrossOrigin(origins = "http://localhost:4200")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @PostMapping
    public ResponseEntity<?> ajouterEvaluation(@RequestBody EvaluationRequest request) {
        try {
            Evaluation evaluation = evaluationService.ajouterEvaluation(request);
            return ResponseEntity.ok(evaluation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
