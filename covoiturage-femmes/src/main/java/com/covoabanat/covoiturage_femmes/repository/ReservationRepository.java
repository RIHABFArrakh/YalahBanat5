
package com.covoabanat.covoiturage_femmes.repository;

import com.covoabanat.covoiturage_femmes.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByPassagerId(Long id);
}

