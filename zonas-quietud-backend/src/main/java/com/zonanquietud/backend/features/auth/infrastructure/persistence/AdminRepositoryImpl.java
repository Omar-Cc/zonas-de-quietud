package com.zonanquietud.backend.features.auth.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.auth.domain.model.Administrador;
import com.zonanquietud.backend.features.auth.domain.repository.AdminRepository;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;
import com.zonanquietud.backend.features.auth.infrastructure.mapper.AuthMapper;
import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.AdministratorJpaEntity;
import com.zonanquietud.backend.features.auth.infrastructure.persistence.repository.AdminJpaRepository;

import lombok.RequiredArgsConstructor;

/**
 * AdminRepositoryImpl - Implementación del puerto AdminRepository
 * Capa de infraestructura - implementa interfaz de repositorio de dominio
 */
@Repository
@RequiredArgsConstructor
public class AdminRepositoryImpl implements AdminRepository {

  private final AdminJpaRepository jpaRepository;
  private final AuthMapper mapper;

  @Override
  public Optional<Administrador> findById(UUID id) {
    return jpaRepository.findById(id)
        .map(mapper::toDomain);
  }

  @Override
  public Optional<Administrador> findByFirebaseUid(String firebaseUid) {
    return jpaRepository.findByFirebaseUid(firebaseUid)
        .map(mapper::toDomain);
  }

  @Override
  public Optional<Administrador> findByUsername(String username) {
    return jpaRepository.findByUsername(username)
        .map(mapper::toDomain);
  }

  @Override
  public Optional<Administrador> findByEmail(UserEmail email) {
    return jpaRepository.findByEmail(email.getValue())
        .map(mapper::toDomain);
  }

  @Override
  public Administrador save(Administrador administrador) {
    AdministratorJpaEntity entity = mapper.toEntity(administrador);
    AdministratorJpaEntity savedEntity = jpaRepository.save(entity);
    return mapper.toDomain(savedEntity);
  }

  @Override
  public boolean existsByUsername(String username) {
    return jpaRepository.existsByUsername(username);
  }

  @Override
  public boolean existsByEmail(UserEmail email) {
    return jpaRepository.existsByEmail(email.getValue());
  }

  @Override
  public void delete(Administrador administrador) {
    AdministratorJpaEntity entity = mapper.toEntity(administrador);
    jpaRepository.delete(entity);
  }
}
