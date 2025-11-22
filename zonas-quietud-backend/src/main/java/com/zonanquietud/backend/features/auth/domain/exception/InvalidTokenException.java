package com.zonanquietud.backend.features.auth.domain.exception;

public class InvalidTokenException extends RuntimeException {

  public InvalidTokenException(String message) {
    super(message);
  }

  public InvalidTokenException(String message, Throwable cause) {
    super(message, cause);
  }

  public static InvalidTokenException expired() {
    return new InvalidTokenException("El token ha expirado");
  }

  public static InvalidTokenException malformed() {
    return new InvalidTokenException("El token tiene un formato inválido");
  }

  public static InvalidTokenException invalid() {
    return new InvalidTokenException("El token es inválido");
  }
}
