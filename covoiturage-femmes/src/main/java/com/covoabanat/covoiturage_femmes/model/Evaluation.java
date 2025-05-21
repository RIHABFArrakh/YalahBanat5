package com.covoabanat.covoiturage_femmes.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "evaluations")
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int note;
    private String commentaire;

    @ManyToOne
    @JoinColumn(name = "conductrice_id", nullable = false)
    private Conductrice conductrice;

    @ManyToOne
    @JoinColumn(name = "passager_id", nullable = false)
    private Passager passager;

    @ManyToOne
    @JoinColumn(name = "voyage_id")
    private Voyage voyage;

    private LocalDateTime createdAt;

    // Constructeur par défaut
    public Evaluation() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters et setters

    public Long getId() {
        return id;
    }

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

    public Conductrice getConductrice() {
        return conductrice;
    }

    public void setConductrice(Conductrice conductrice) {
        this.conductrice = conductrice;
    }

    public Passager getPassager() {
        return passager;
    }

    public void setPassager(Passager passager) {
        this.passager = passager;
    }

    public Voyage getVoyage() {
        return voyage;
    }

    public void setVoyage(Voyage voyage) {
        this.voyage = voyage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
