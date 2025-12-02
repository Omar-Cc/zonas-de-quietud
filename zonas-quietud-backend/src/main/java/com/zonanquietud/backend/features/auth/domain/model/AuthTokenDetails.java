package com.zonanquietud.backend.features.auth.domain.model;

/**
 * AuthTokenDetails - Value Object
 * Encapsula detalles de autenticación extraídos de tokens ID de Firebase
 * Esto previene que objetos del SDK de Firebase se filtren a la capa de dominio
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
