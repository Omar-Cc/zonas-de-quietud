package com.zonanquietud.backend.features.auth.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.AdministratorJpaEntity;

/**
 * AdminJpaRepository - Spring Data JPA Repository
 * Infrastructure layer - can use Spring Data annotations
 */
@Repository
public interface AdminJpaRepository extends JpaRepository<AdministratorJpaEntity, UUID> {

  Optional<AdministratorJpaEntity> findByFirebaseUid(String firebaseUid);

  Optional<AdministratorJpaEntity> findByUsername(String username);

  Optional<AdministratorJpaEntity> findByEmail(String email);

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  boolean existsByFirebaseUid(String firebaseUid);
}
