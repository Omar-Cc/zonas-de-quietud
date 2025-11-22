package com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa;

import java.time.LocalDateTime;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.enums.AdminRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "administrators", indexes = {
    @Index(name = "idx_admin_firebase_uid", columnList = "firebase_uid", unique = true),
    @Index(name = "idx_admin_username", columnList = "username", unique = true),
    @Index(name = "idx_admin_email", columnList = "email", unique = true)
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorJpaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false, unique = true, length = 50)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "firebase_uid", unique = true, length = 128)
  private String firebaseUid;

  @Column(name = "password_hash")
  private String passwordHash;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private AdminRole role;

  @Column(name = "is_active", nullable = false)
  @Builder.Default
  private boolean isActive = true;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "last_login_at")
  private LocalDateTime lastLoginAt;

  @PrePersist
  protected void onCreate() {
    if (createdAt == null) {
      createdAt = LocalDateTime.now();
    }
  }
}
