package com.covoabanat.covoiturage_femmes.repository;


import com.covoabanat.covoiturage_femmes.model.Passager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassagerRepository extends JpaRepository<Passager, Long> {
        Optional<Passager> findByUserId(Long userId);

}
