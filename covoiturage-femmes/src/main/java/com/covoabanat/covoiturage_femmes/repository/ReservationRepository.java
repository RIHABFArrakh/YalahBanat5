
    package com.covoabanat.covoiturage_femmes.repository;

    import com.covoabanat.covoiturage_femmes.model.Conductrice;
    import com.covoabanat.covoiturage_femmes.model.Reservation;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;

    import java.util.List;

    public interface ReservationRepository extends JpaRepository<Reservation, Long> {
        List<Reservation> findByPassagerId(Long id);
        @Query("SELECT r FROM Reservation r WHERE r.voyage.conductrice.id = :conductriceId")
        List<Reservation> findByConductriceId(@Param("conductriceId") Long conductriceId);
        @Query("SELECT r FROM Reservation r WHERE r.voyage.id = :voyageId AND r.voyage.conductrice.id = :conductriceId")
        List<Reservation> findByConductriceIdAndVoyageId(@Param("conductriceId") Long conductriceId, @Param("voyageId") Long voyageId);

    }


