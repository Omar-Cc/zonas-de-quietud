package com.zonanquietud.backend.features.auth.domain.model;

/**
 * AuthTokenDetails - Value Object
 * Encapsulates authentication details extracted from Firebase ID tokens
 * This prevents Firebase SDK objects from leaking into the domain layer
 */
public record AuthTokenDetails(
    String uid,
    String email,
    boolean emailVerified) {
  public AuthTokenDetails {
    if (uid == null || uid.trim().isEmpty()) {
      throw new IllegalArgumentException("UID cannot be null or empty");
    }
    if (email == null || email.trim().isEmpty()) {
      throw new IllegalArgumentException("Email cannot be null or empty");
    }
  }
}
