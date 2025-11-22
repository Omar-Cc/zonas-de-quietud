package com.zonanquietud.backend.features.auth.infrastructure.adapter;

import org.springframework.stereotype.Component;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.zonanquietud.backend.features.auth.domain.exception.InvalidTokenException;
import com.zonanquietud.backend.features.auth.domain.port.IdentityProvider;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * FirebaseIdentityProviderAdapter - Implements IdentityProvider using Firebase
 * Auth
 * Infrastructure layer - adapts Firebase to domain port
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class FirebaseIdentityProviderAdapter implements IdentityProvider {

  private final FirebaseAuth firebaseAuth;

  @Override
  public String verifyToken(String token) {
    try {
      FirebaseToken decodedToken = firebaseAuth.verifyIdToken(token);
      return decodedToken.getUid();
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

  @Override
  public UserEmail getEmailFromToken(String token) {
    try {
      FirebaseToken decodedToken = firebaseAuth.verifyIdToken(token);
      String email = decodedToken.getEmail();

      if (email == null || email.trim().isEmpty()) {
        throw new IllegalStateException("Email not found in Firebase token");
      }

      return new UserEmail(email);
    } catch (FirebaseAuthException e) {
      log.error("Error getting email from Firebase token", e);
      throw InvalidTokenException.invalid();
    }
  }
}
