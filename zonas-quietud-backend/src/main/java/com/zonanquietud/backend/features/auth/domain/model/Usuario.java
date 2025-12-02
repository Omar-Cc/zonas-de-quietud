package com.zonanquietud.backend.features.auth.domain.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.enums.Gender;
import com.zonanquietud.backend.features.auth.domain.enums.Membership;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

/**
 * Usuario - Modelo de Dominio (Raíz de Agregado)
 * Implementación Java pura sin dependencias externas
 */
public class Usuario {
  private UUID id;
  private UserEmail email;
  private String firebaseUid;

  private String firstName;
  private String lastName;

  private String avatarUrl;
  private String phone;
  private LocalDate birthDate;

  private Gender gender;
  private Membership membership;

  private boolean isVerified;
  private boolean isActive;

  private LocalDateTime createdAt;
  private LocalDateTime lastLoginAt;

  private int loginCount;

  private Usuario() {
  }

  public Usuario(UUID id, UserEmail email, String firebaseUid, String firstName, String lastName) {
    if (email == null) {
      throw new IllegalArgumentException("Email no puede ser nulo");
    }
    if (firebaseUid == null || firebaseUid.trim().isEmpty()) {
      throw new IllegalArgumentException("Firebase UID no puede estar vacío");
    }
    if (firstName == null || firstName.trim().isEmpty()) {
      throw new IllegalArgumentException("Nombre no puede estar vacío");
    }
    if (lastName == null || lastName.trim().isEmpty()) {
      throw new IllegalArgumentException("Apellido no puede estar vacío");
    }

    this.id = id;
    this.email = email;
    this.firebaseUid = firebaseUid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = true;
    this.isVerified = false;
    this.membership = Membership.FREE;
    this.loginCount = 0;
    this.createdAt = LocalDateTime.now();
  }

  /** Método de fábrica para crear un nuevo usuario */
  public static Usuario createNew(UserEmail email, String firebaseUid, String firstName, String lastName) {
    return new Usuario(UUID.randomUUID(), email, firebaseUid, firstName, lastName);
  }

  public void updateLastLogin() {
    this.lastLoginAt = LocalDateTime.now();
    this.loginCount++;
  }

  public void activate() {
    this.isActive = true;
  }

  public void deactivate() {
    this.isActive = false;
  }

  public void verify() {
    this.isVerified = true;
  }

  public void updateProfile(String firstName, String lastName, String phone, LocalDate birthDate, Gender gender) {
    if (firstName != null && !firstName.trim().isEmpty()) {
      this.firstName = firstName;
    }
    if (lastName != null && !lastName.trim().isEmpty()) {
      this.lastName = lastName;
    }
    this.phone = phone;
    this.birthDate = birthDate;
    this.gender = gender;
  }

  public void updateAvatar(String avatarUrl) {
    this.avatarUrl = avatarUrl;
  }

  public void upgradeMembership(Membership membership) {
    if (membership == null) {
      throw new IllegalArgumentException("Membership no puede ser nulo");
    }
    this.membership = membership;
  }

  public String getFullName() {
    return firstName + " " + lastName;
  }

  public boolean isPremium() {
    return membership == Membership.PREMIUM;
  }

  public UUID getId() {
    return id;
  }

  public UserEmail getEmail() {
    return email;
  }

  public String getFirebaseUid() {
    return firebaseUid;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getAvatarUrl() {
    return avatarUrl;
  }

  public String getPhone() {
    return phone;
  }

  public LocalDate getBirthDate() {
    return birthDate;
  }

  public Gender getGender() {
    return gender;
  }

  public Membership getMembership() {
    return membership;
  }

  public boolean isVerified() {
    return isVerified;
  }

  public boolean isActive() {
    return isActive;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getLastLoginAt() {
    return lastLoginAt;
  }

  public int getLoginCount() {
    return loginCount;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public void setEmail(UserEmail email) {
    this.email = email;
  }

  public void setFirebaseUid(String firebaseUid) {
    this.firebaseUid = firebaseUid;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setAvatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public void setMembership(Membership membership) {
    this.membership = membership;
  }

  public void setVerified(boolean verified) {
    isVerified = verified;
  }

  public void setActive(boolean active) {
    isActive = active;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setLastLoginAt(LocalDateTime lastLoginAt) {
    this.lastLoginAt = lastLoginAt;
  }

  public void setLoginCount(int loginCount) {
    this.loginCount = loginCount;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    Usuario usuario = (Usuario) o;
    return Objects.equals(id, usuario.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Usuario{" +
        "id=" + id +
        ", email=" + email +
        ", firebaseUid='" + firebaseUid + '\'' +
        ", firstName='" + firstName + '\'' +
        ", lastName='" + lastName + '\'' +
        ", membership=" + membership +
        ", isActive=" + isActive +
        '}';
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private final Usuario usuario;

    private Builder() {
      this.usuario = new Usuario();
    }

    public Builder id(UUID id) {
      usuario.id = id;
      return this;
    }

    public Builder email(UserEmail email) {
      usuario.email = email;
      return this;
    }

    public Builder firebaseUid(String firebaseUid) {
      usuario.firebaseUid = firebaseUid;
      return this;
    }

    public Builder firstName(String firstName) {
      usuario.firstName = firstName;
      return this;
    }

    public Builder lastName(String lastName) {
      usuario.lastName = lastName;
      return this;
    }

    public Builder avatarUrl(String avatarUrl) {
      usuario.avatarUrl = avatarUrl;
      return this;
    }

    public Builder phone(String phone) {
      usuario.phone = phone;
      return this;
    }

    public Builder birthDate(LocalDate birthDate) {
      usuario.birthDate = birthDate;
      return this;
    }

    public Builder gender(Gender gender) {
      usuario.gender = gender;
      return this;
    }

    public Builder membership(Membership membership) {
      usuario.membership = membership;
      return this;
    }

    public Builder isVerified(boolean isVerified) {
      usuario.isVerified = isVerified;
      return this;
    }

    public Builder isActive(boolean isActive) {
      usuario.isActive = isActive;
      return this;
    }

    public Builder createdAt(LocalDateTime createdAt) {
      usuario.createdAt = createdAt;
      return this;
    }

    public Builder lastLoginAt(LocalDateTime lastLoginAt) {
      usuario.lastLoginAt = lastLoginAt;
      return this;
    }

    public Builder loginCount(int loginCount) {
      usuario.loginCount = loginCount;
      return this;
    }

    public Usuario build() {

      if (usuario.email == null) {
        throw new IllegalStateException("Email es requerido");
      }
      if (usuario.firebaseUid == null || usuario.firebaseUid.trim().isEmpty()) {
        throw new IllegalStateException("Firebase UID es requerido");
      }
      if (usuario.firstName == null || usuario.firstName.trim().isEmpty()) {
        throw new IllegalStateException("Nombre es requerido");
      }
      if (usuario.lastName == null || usuario.lastName.trim().isEmpty()) {
        throw new IllegalStateException("Apellido es requerido");
      }

      if (usuario.id == null) {
        usuario.id = UUID.randomUUID();
      }
      if (usuario.membership == null) {
        usuario.membership = Membership.FREE;
      }
      if (usuario.createdAt == null) {
        usuario.createdAt = LocalDateTime.now();
      }

      return usuario;
    }
  }
}
