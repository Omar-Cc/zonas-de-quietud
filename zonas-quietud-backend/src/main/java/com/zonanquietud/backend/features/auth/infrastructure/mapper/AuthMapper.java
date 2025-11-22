package com.zonanquietud.backend.features.auth.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.auth.controller.dto.UserResponse;
import com.zonanquietud.backend.features.auth.domain.model.Administrador;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;
import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.AdministratorJpaEntity;
import com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa.UserJpaEntity;

/**
 * AuthMapper - Maps between domain models, JPA entities, and DTOs
 * Infrastructure layer - can use Spring annotations
 */
@Component
public class AuthMapper {

  // ========== Usuario Mappings ==========

  /**
   * Maps JPA entity to domain model
   */
  public Usuario toDomain(UserJpaEntity entity) {
    if (entity == null) {
      return null;
    }

    return Usuario.builder()
        .id(entity.getId())
        .email(new UserEmail(entity.getEmail()))
        .firebaseUid(entity.getFirebaseUid())
        .firstName(entity.getFirstName())
        .lastName(entity.getLastName())
        .avatarUrl(entity.getAvatarUrl())
        .phone(entity.getPhone())
        .birthDate(entity.getBirthDate())
        .gender(entity.getGender())
        .membership(entity.getMembership())
        .isVerified(entity.isVerified())
        .isActive(entity.isActive())
        .createdAt(entity.getCreatedAt())
        .lastLoginAt(entity.getLastLoginAt())
        .loginCount(entity.getLoginCount())
        .build();
  }

  /**
   * Maps domain model to JPA entity
   */
  public UserJpaEntity toEntity(Usuario domain) {
    if (domain == null) {
      return null;
    }

    return UserJpaEntity.builder()
        .id(domain.getId())
        .email(domain.getEmail().getValue())
        .firebaseUid(domain.getFirebaseUid())
        .firstName(domain.getFirstName())
        .lastName(domain.getLastName())
        .avatarUrl(domain.getAvatarUrl())
        .phone(domain.getPhone())
        .birthDate(domain.getBirthDate())
        .gender(domain.getGender())
        .membership(domain.getMembership())
        .isVerified(domain.isVerified())
        .isActive(domain.isActive())
        .createdAt(domain.getCreatedAt())
        .lastLoginAt(domain.getLastLoginAt())
        .loginCount(domain.getLoginCount())
        .build();
  }

  /**
   * Maps domain model to UserResponse DTO
   */
  public UserResponse toUserResponse(Usuario domain) {
    if (domain == null) {
      return null;
    }

    return new UserResponse(
        domain.getId(),
        domain.getEmail().getValue(),
        domain.getFirebaseUid(),
        domain.getFirstName(),
        domain.getLastName(),
        domain.getAvatarUrl(),
        domain.getPhone(),
        domain.getBirthDate(),
        domain.getGender(),
        domain.getMembership(),
        domain.isVerified(),
        domain.isActive(),
        domain.getCreatedAt(),
        domain.getLastLoginAt(),
        domain.getLoginCount());
  }

  // ========== Administrador Mappings ==========

  /**
   * Maps JPA entity to domain model
   */
  public Administrador toDomain(AdministratorJpaEntity entity) {
    if (entity == null) {
      return null;
    }

    return Administrador.builder()
        .id(entity.getId())
        .username(entity.getUsername())
        .email(new UserEmail(entity.getEmail()))
        .firebaseUid(entity.getFirebaseUid())
        .passwordHash(entity.getPasswordHash())
        .firstName(entity.getFirstName())
        .lastName(entity.getLastName())
        .role(entity.getRole())
        .isActive(entity.isActive())
        .createdAt(entity.getCreatedAt())
        .lastLoginAt(entity.getLastLoginAt())
        .build();
  }

  /**
   * Maps domain model to JPA entity
   */
  public AdministratorJpaEntity toEntity(Administrador domain) {
    if (domain == null) {
      return null;
    }

    return AdministratorJpaEntity.builder()
        .id(domain.getId())
        .username(domain.getUsername())
        .email(domain.getEmail().getValue())
        .firebaseUid(domain.getFirebaseUid())
        .passwordHash(domain.getPasswordHash())
        .firstName(domain.getFirstName())
        .lastName(domain.getLastName())
        .role(domain.getRole())
        .isActive(domain.isActive())
        .createdAt(domain.getCreatedAt())
        .lastLoginAt(domain.getLastLoginAt())
        .build();
  }

  /**
   * Updates existing JPA entity from domain model
   * Useful for update operations
   */
  public void updateEntity(UserJpaEntity entity, Usuario domain) {
    if (entity == null || domain == null) {
      return;
    }

    entity.setEmail(domain.getEmail().getValue());
    entity.setFirstName(domain.getFirstName());
    entity.setLastName(domain.getLastName());
    entity.setAvatarUrl(domain.getAvatarUrl());
    entity.setPhone(domain.getPhone());
    entity.setBirthDate(domain.getBirthDate());
    entity.setGender(domain.getGender());
    entity.setMembership(domain.getMembership());
    entity.setVerified(domain.isVerified());
    entity.setActive(domain.isActive());
    entity.setLastLoginAt(domain.getLastLoginAt());
    entity.setLoginCount(domain.getLoginCount());
  }
}
