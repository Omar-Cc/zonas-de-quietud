package com.zonanquietud.backend.features.auth.domain.exception;

public class UserNotFoundException extends RuntimeException {

  public UserNotFoundException(String message) {
    super(message);
  }

  public UserNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public static UserNotFoundException byFirebaseUid(String firebaseUid) {
    return new UserNotFoundException("Usuario no encontrado con Firebase UID: " + firebaseUid);
  }

  public static UserNotFoundException byEmail(String email) {
    return new UserNotFoundException("Usuario no encontrado con email: " + email);
  }

  public static UserNotFoundException byId(String id) {
    return new UserNotFoundException("Usuario no encontrado con ID: " + id);
  }
}
