package com.zonanquietud.backend.features.auth.domain.exception;

public class InvalidCredentialsException extends RuntimeException {

  public InvalidCredentialsException(String message) {
    super(message);
  }

  public InvalidCredentialsException(String message, Throwable cause) {
    super(message, cause);
  }

  public static InvalidCredentialsException create() {
    return new InvalidCredentialsException("Credenciales inválidas");
  }
}
