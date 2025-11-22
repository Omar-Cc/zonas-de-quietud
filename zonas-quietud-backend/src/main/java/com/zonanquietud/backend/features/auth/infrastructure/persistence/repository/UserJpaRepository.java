package com.zonanquietud.backend.features.auth.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.UserJpaEntity;

/**
 * UserJpaRepository - Spring Data JPA Repository
 * Infrastructure layer - can use Spring Data annotations
 */
@Repository
public interface UserJpaRepository extends JpaRepository<UserJpaEntity, UUID> {

  Optional<UserJpaEntity> findByFirebaseUid(String firebaseUid);

  Optional<UserJpaEntity> findByEmail(String email);

  boolean existsByEmail(String email);

  boolean existsByFirebaseUid(String firebaseUid);
}
