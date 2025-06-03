package com.covoabanat.covoiturage_femmes.service;


import com.covoabanat.covoiturage_femmes.model.*;
import com.covoabanat.covoiturage_femmes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private ConductriceRepository conductriceRepository;

    @Autowired
    private PassagerRepository passagerRepository;

    @Autowired
    private VoyageRepository voyageRepository;

    public Evaluation ajouterEvaluation(EvaluationRequest request) throws Exception {
        Optional<Conductrice> conductriceOpt = conductriceRepository.findById(request.getConductriceId());
        Optional<Passager> passagerOpt = passagerRepository.findById(request.getPassagerId());

        if (conductriceOpt.isEmpty()) {
            throw new Exception("Conductrice non trouvée avec l'id : " + request.getConductriceId());
        }
        if (passagerOpt.isEmpty()) {
            throw new Exception("Passager non trouvé avec l'id : " + request.getPassagerId());
        }

        Evaluation evaluation = new Evaluation();
        evaluation.setNote(request.getNote());
        evaluation.setCommentaire(request.getCommentaire());
        evaluation.setConductrice(conductriceOpt.get());
        evaluation.setPassager(passagerOpt.get());
        evaluation.setCreatedAt(LocalDateTime.now());

        if (request.getVoyageId() != null) {
            Optional<Voyage> voyageOpt = voyageRepository.findById(request.getVoyageId());
            voyageOpt.ifPresent(evaluation::setVoyage);
        }

        return evaluationRepository.save(evaluation);
    }

    public static class EvaluationRequest {
        private int note;
        private String commentaire;
        private Long conductriceId;
        private Long passagerId;
        private Long voyageId;

        // getters et setters
        public int getNote() { return note; }
        public void setNote(int note) { this.note = note; }
        public String getCommentaire() { return commentaire; }
        public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
        public Long getConductriceId() { return conductriceId; }
        public void setConductriceId(Long conductriceId) { this.conductriceId = conductriceId; }
        public Long getPassagerId() { return passagerId; }
        public void setPassagerId(Long passagerId) { this.passagerId = passagerId; }
        public Long getVoyageId() { return voyageId; }
        public void setVoyageId(Long voyageId) { this.voyageId = voyageId; }
    }
}
