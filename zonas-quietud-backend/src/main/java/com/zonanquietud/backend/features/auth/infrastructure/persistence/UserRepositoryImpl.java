package com.zonanquietud.backend.features.auth.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;
import com.zonanquietud.backend.features.auth.infrastructure.mapper.AuthMapper;
import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.UserJpaEntity;
import com.zonanquietud.backend.features.auth.infrastructure.persistence.repository.UserJpaRepository;

import lombok.RequiredArgsConstructor;

/**
 * UserRepositoryImpl - Implementación del puerto UserRepository
 * Capa de infraestructura - implementa interfaz de repositorio de dominio
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

  private final UserJpaRepository jpaRepository;
  private final AuthMapper mapper;

  @Override
  public Optional<Usuario> findByFirebaseUid(String firebaseUid) {
    return jpaRepository.findByFirebaseUid(firebaseUid)
        .map(mapper::toDomain);
  }

  @Override
  public Optional<Usuario> findByEmail(UserEmail email) {
    return jpaRepository.findByEmail(email.getValue())
        .map(mapper::toDomain);
  }

  @Override
  public Usuario save(Usuario usuario) {
    UserJpaEntity entity;

    if (usuario.getId() != null && jpaRepository.existsById(usuario.getId())) {
      entity = jpaRepository.findById(usuario.getId())
          .orElseThrow(() -> new IllegalStateException("Entity should exist"));
      mapper.updateEntity(entity, usuario);
    } else {
      entity = mapper.toEntity(usuario);
      entity.setId(null);
    }

    UserJpaEntity savedEntity = jpaRepository.save(entity);
    return mapper.toDomain(savedEntity);
  }

  @Override
  public boolean existsByEmail(UserEmail email) {
    return jpaRepository.existsByEmail(email.getValue());
  }

  @Override
  public Optional<Usuario> findById(UUID id) {
    return jpaRepository.findById(id)
        .map(mapper::toDomain);
  }
}
