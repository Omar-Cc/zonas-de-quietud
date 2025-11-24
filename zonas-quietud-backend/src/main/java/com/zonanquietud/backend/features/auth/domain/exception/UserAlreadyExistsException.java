package com.zonanquietud.backend.features.auth.domain.exception;

public class UserAlreadyExistsException extends RuntimeException {

  public UserAlreadyExistsException(String message) {
    super(message);
  }

  public UserAlreadyExistsException(String message, Throwable cause) {
    super(message, cause);
  }

  public static UserAlreadyExistsException byEmail(String email) {
    return new UserAlreadyExistsException("Ya existe un usuario con el email: " + email);
  }

  public static UserAlreadyExistsException byFirebaseUid(String firebaseUid) {
    return new UserAlreadyExistsException("Ya existe un usuario con Firebase UID: " + firebaseUid);
  }
}
