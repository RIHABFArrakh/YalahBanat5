package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Conductrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConductriceRepository extends JpaRepository<Conductrice, Long> {
}