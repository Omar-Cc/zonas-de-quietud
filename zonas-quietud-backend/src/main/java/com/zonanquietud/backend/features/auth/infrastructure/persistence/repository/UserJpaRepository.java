package com.zonanquietud.backend.features.auth.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.UserJpaEntity;

/**
 * UserJpaRepository - Repositorio Spring Data JPA
 * Capa de infraestructura - puede usar anotaciones de Spring Data
 */
@Repository
public interface UserJpaRepository extends JpaRepository<UserJpaEntity, UUID> {

  Optional<UserJpaEntity> findByFirebaseUid(String firebaseUid);

  Optional<UserJpaEntity> findByEmail(String email);

  boolean existsByEmail(String email);

  boolean existsByFirebaseUid(String firebaseUid);
}
