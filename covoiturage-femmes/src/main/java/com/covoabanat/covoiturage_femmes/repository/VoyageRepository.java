package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Voyage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoyageRepository extends JpaRepository<Voyage, Long> {
    List<Voyage> findByConductriceId(Long conductriceId);
}
