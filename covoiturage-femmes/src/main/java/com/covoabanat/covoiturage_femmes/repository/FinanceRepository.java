package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Finance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepository extends JpaRepository<Finance, Long> {

    // Méthode pour obtenir le total des montants des finances d'une conductrice spécifique
    @Query("SELECT SUM(f.montant) FROM Finance f WHERE f.conductrice.id = :conductriceId")
    Double findTotalByConductriceId(Long conductriceId);
}
