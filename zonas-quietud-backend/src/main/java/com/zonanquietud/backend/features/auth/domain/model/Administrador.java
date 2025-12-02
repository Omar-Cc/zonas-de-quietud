package com.zonanquietud.backend.features.auth.domain.model;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.enums.AdminRole;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

/**
 * Administrador - Modelo de Dominio (Raíz de Agregado)
 * Implementación Java pura sin dependencias externas
 */
public class Administrador {
  private UUID id;
  private String username;
  private UserEmail email;
  private String firebaseUid;
  private String passwordHash;
  private String firstName;
  private String lastName;
  private AdminRole role;
  private boolean isActive;
  private LocalDateTime createdAt;
  private LocalDateTime lastLoginAt;

  private Administrador() {
  }

  public Administrador(UUID id, String username, UserEmail email, String firebaseUid,
      String firstName, String lastName, AdminRole role) {
    if (username == null || username.trim().isEmpty()) {
      throw new IllegalArgumentException("Username no puede estar vacío");
    }
    if (email == null) {
      throw new IllegalArgumentException("Email no puede ser nulo");
    }
    if (firstName == null || firstName.trim().isEmpty()) {
      throw new IllegalArgumentException("Nombre no puede estar vacío");
    }
    if (lastName == null || lastName.trim().isEmpty()) {
      throw new IllegalArgumentException("Apellido no puede estar vacío");
    }
    if (role == null) {
      throw new IllegalArgumentException("Role no puede ser nulo");
    }

    this.id = id;
    this.username = username;
    this.email = email;
    this.firebaseUid = firebaseUid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.isActive = true;
    this.createdAt = LocalDateTime.now();
  }

  /** Método de fábrica para crear un nuevo administrador */
  public static Administrador createNew(String username, UserEmail email, String firebaseUid,
      String firstName, String lastName, AdminRole role) {
    return new Administrador(UUID.randomUUID(), username, email, firebaseUid, firstName, lastName, role);
  }

  public void updateLastLogin() {
    this.lastLoginAt = LocalDateTime.now();
  }

  public void activate() {
    this.isActive = true;
  }

  public void deactivate() {
    this.isActive = false;
  }

  public void changeRole(AdminRole newRole) {
    if (newRole == null) {
      throw new IllegalArgumentException("Role no puede ser nulo");
    }
    this.role = newRole;
  }

  public void updateProfile(String firstName, String lastName) {
    if (firstName != null && !firstName.trim().isEmpty()) {
      this.firstName = firstName;
    }
    if (lastName != null && !lastName.trim().isEmpty()) {
      this.lastName = lastName;
    }
  }

  public void changePassword(String newPasswordHash) {
    if (newPasswordHash == null || newPasswordHash.trim().isEmpty()) {
      throw new IllegalArgumentException("Password hash no puede estar vacío");
    }
    this.passwordHash = newPasswordHash;
  }

  public String getFullName() {
    return firstName + " " + lastName;
  }

  public boolean isSuperAdmin() {
    return role == AdminRole.SUPER_ADMIN;
  }

  public UUID getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public UserEmail getEmail() {
    return email;
  }

  public String getFirebaseUid() {
    return firebaseUid;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public AdminRole getRole() {
    return role;
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

  public void setId(UUID id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setEmail(UserEmail email) {
    this.email = email;
  }

  public void setFirebaseUid(String firebaseUid) {
    this.firebaseUid = firebaseUid;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setRole(AdminRole role) {
    this.role = role;
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

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    Administrador that = (Administrador) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Administrador{" +
        "id=" + id +
        ", username='" + username + '\'' +
        ", email=" + email +
        ", role=" + role +
        ", isActive=" + isActive +
        '}';
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private final Administrador admin;

    private Builder() {
      this.admin = new Administrador();
    }

    public Builder id(UUID id) {
      admin.id = id;
      return this;
    }

    public Builder username(String username) {
      admin.username = username;
      return this;
    }

    public Builder email(UserEmail email) {
      admin.email = email;
      return this;
    }

    public Builder firebaseUid(String firebaseUid) {
      admin.firebaseUid = firebaseUid;
      return this;
    }

    public Builder passwordHash(String passwordHash) {
      admin.passwordHash = passwordHash;
      return this;
    }

    public Builder firstName(String firstName) {
      admin.firstName = firstName;
      return this;
    }

    public Builder lastName(String lastName) {
      admin.lastName = lastName;
      return this;
    }

    public Builder role(AdminRole role) {
      admin.role = role;
      return this;
    }

    public Builder isActive(boolean isActive) {
      admin.isActive = isActive;
      return this;
    }

    public Builder createdAt(LocalDateTime createdAt) {
      admin.createdAt = createdAt;
      return this;
    }

    public Builder lastLoginAt(LocalDateTime lastLoginAt) {
      admin.lastLoginAt = lastLoginAt;
      return this;
    }

    public Administrador build() {

      if (admin.username == null || admin.username.trim().isEmpty()) {
        throw new IllegalStateException("Username es requerido");
      }
      if (admin.email == null) {
        throw new IllegalStateException("Email es requerido");
      }
      if (admin.firstName == null || admin.firstName.trim().isEmpty()) {
        throw new IllegalStateException("Nombre es requerido");
      }
      if (admin.lastName == null || admin.lastName.trim().isEmpty()) {
        throw new IllegalStateException("Apellido es requerido");
      }
      if (admin.role == null) {
        throw new IllegalStateException("Role es requerido");
      }

      if (admin.id == null) {
        admin.id = UUID.randomUUID();
      }
      if (admin.createdAt == null) {
        admin.createdAt = LocalDateTime.now();
      }

      return admin;
    }
  }
}
