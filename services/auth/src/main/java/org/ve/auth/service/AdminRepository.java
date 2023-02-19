package org.ve.auth.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.ve.auth.model.Admin;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository <Admin, Long>{
    Optional<Admin> findByEmail(String emailAddress);
}
//