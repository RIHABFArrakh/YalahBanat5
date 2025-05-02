package com.covoabanat.covoiturage_femmes.repository;


import com.covoabanat.covoiturage_femmes.model.Passager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassagerRepository extends JpaRepository<Passager, Long> {
}
