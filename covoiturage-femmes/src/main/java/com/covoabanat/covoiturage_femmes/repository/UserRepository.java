package com.covoabanat.covoiturage_femmes.repository;


import com.covoabanat.covoiturage_femmes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import com.covoabanat.covoiturage_femmes.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByActivationToken(String email);
    boolean existsByEmail(String email);
}