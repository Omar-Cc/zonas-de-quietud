package com.zonanquietud.backend.features.auth.domain.repository;

import java.util.Optional;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.model.Administrador;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

/**
 * AdminRepository - Puerto (Interfaz)
 * Define operaciones para persistencia de Administrador
 */
public interface AdminRepository {

  Optional<Administrador> findById(UUID id);

  Optional<Administrador> findByFirebaseUid(String firebaseUid);

  Optional<Administrador> findByUsername(String username);

  Optional<Administrador> findByEmail(UserEmail email);

  Administrador save(Administrador administrador);

  boolean existsByUsername(String username);

  boolean existsByEmail(UserEmail email);

  void delete(Administrador administrador);
}
