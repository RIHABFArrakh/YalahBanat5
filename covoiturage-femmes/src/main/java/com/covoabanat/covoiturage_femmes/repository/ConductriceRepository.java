package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Conductrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ConductriceRepository extends JpaRepository<Conductrice, Long> {
    Optional<Conductrice> findByUserId(Long userId);


    @Query("SELECT c FROM Conductrice c WHERE c.user.email = :email")
    Optional<Conductrice> findByUserEmail(@Param("email") String email);
}
