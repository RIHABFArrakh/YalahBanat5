package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Voyage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VoyageRepository extends JpaRepository<Voyage, Long> {

    List<Voyage> findByConductriceId(Long conductriceId);
    List<Voyage> findByDepartAndDestinationAndDateDepartBetween(String depart, String destination, LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(v.prix) FROM Voyage v WHERE v.conductrice.id = :conductriceId")
    Double getTotalPrixByConductriceId(@Param("conductriceId") Long conductriceId);
}
