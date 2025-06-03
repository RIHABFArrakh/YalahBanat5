package com.covoabanat.covoiturage_femmes.dto;

public  class EvaluationRequest {
    private int note;
    private String commentaire;
    private Long conductriceId;
    private Long passagerId;
    private Long voyageId; // optionnel

    // getters et setters
    public int getNote() {
        return note;
    }
    public void setNote(int note) {
        this.note = note;
    }
    public String getCommentaire() {
        return commentaire;
    }
    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    public Long getConductriceId() {
        return conductriceId;
    }
    public void setConductriceId(Long conductriceId) {
        this.conductriceId = conductriceId;
    }
    public Long getPassagerId() {
        return passagerId;
    }
    public void setPassagerId(Long passagerId) {
        this.passagerId = passagerId;
    }
    public Long getVoyageId() {
        return voyageId;
    }
    public void setVoyageId(Long voyageId) {
        this.voyageId = voyageId;
    }
}