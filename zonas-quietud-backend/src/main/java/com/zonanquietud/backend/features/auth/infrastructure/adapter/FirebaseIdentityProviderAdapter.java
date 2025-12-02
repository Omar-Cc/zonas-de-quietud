package com.zonanquietud.backend.features.auth.infrastructure.adapter;

import org.springframework.stereotype.Component;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.zonanquietud.backend.features.auth.domain.exception.InvalidTokenException;
import com.zonanquietud.backend.features.auth.domain.model.AuthTokenDetails;
import com.zonanquietud.backend.features.auth.domain.port.IdentityProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * FirebaseIdentityProviderAdapter - Implementa IdentityProvider usando Firebase
 * Auth
 * Capa de infraestructura - adapta Firebase al puerto de dominio
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class FirebaseIdentityProviderAdapter implements IdentityProvider {

  private final FirebaseAuth firebaseAuth;

  @Override
  public AuthTokenDetails verify(String token) {
    try {
      FirebaseToken decodedToken = firebaseAuth.verifyIdToken(token);

      String uid = decodedToken.getUid();
      String email = decodedToken.getEmail();
      boolean emailVerified = decodedToken.isEmailVerified();

      if (email == null || email.trim().isEmpty()) {
        throw new IllegalStateException("Email not found in Firebase token");
      }

      log.debug("Token verified successfully - UID: {}, Email: {}, Verified: {}",
          uid, email, emailVerified);

      return new AuthTokenDetails(uid, email, emailVerified);

    } catch (FirebaseAuthException e) {
      log.error("Error verifying Firebase token", e);
      if (e.getAuthErrorCode().name().contains("EXPIRED")) {
        throw InvalidTokenException.expired();
      } else {
        throw InvalidTokenException.invalid();
      }
    } catch (IllegalArgumentException e) {
      log.error("Invalid token format", e);
      throw InvalidTokenException.malformed();
    }
  }
}
