package com.zonanquietud.backend.features.auth.domain.exception;

public class EmailAlreadyInUseException extends RuntimeException {

  public EmailAlreadyInUseException(String message) {
    super(message);
  }

  public EmailAlreadyInUseException(String message, Throwable cause) {
    super(message, cause);
  }

  public static EmailAlreadyInUseException forEmail(String email) {
    return new EmailAlreadyInUseException("El email ya está en uso: " + email);
  }
}
