package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Conductrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConductriceRepository extends JpaRepository<Conductrice, Long> {
    Optional<Conductrice> findByUserId(Long userId);

    //Optional<Conductrice> findByEmail(String email);
}
