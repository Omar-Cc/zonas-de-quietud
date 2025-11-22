package com.zonanquietud.backend.features.auth.infrastructure.persistence.jpa;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.enums.Gender;
import com.zonanquietud.backend.features.auth.domain.enums.Membership;

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
@Table(name = "users", indexes = {
    @Index(name = "idx_user_firebase_uid", columnList = "firebase_uid", unique = true),
    @Index(name = "idx_user_email", columnList = "email", unique = true)
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserJpaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "firebase_uid", nullable = false, unique = true, length = 128)
  private String firebaseUid;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "avatar_url")
  private String avatarUrl;

  private String phone;

  @Column(name = "birth_date")
  private LocalDate birthDate;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private Gender gender;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  @Builder.Default
  private Membership membership = Membership.FREE;

  @Column(name = "is_verified", nullable = false)
  @Builder.Default
  private boolean isVerified = false;

  @Column(name = "is_active", nullable = false)
  @Builder.Default
  private boolean isActive = true;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "last_login_at")
  private LocalDateTime lastLoginAt;

  @Column(name = "login_count", nullable = false)
  @Builder.Default
  private int loginCount = 0;

  @PrePersist
  protected void onCreate() {
    if (createdAt == null) {
      createdAt = LocalDateTime.now();
    }
  }
}
