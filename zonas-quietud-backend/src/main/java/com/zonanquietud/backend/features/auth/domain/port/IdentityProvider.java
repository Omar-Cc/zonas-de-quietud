package com.zonanquietud.backend.features.auth.domain.port;

import com.zonanquietud.backend.features.auth.domain.model.AuthTokenDetails;

/**
 * IdentityProvider - Port for external identity verification
 * Abstracts Firebase authentication from the domain layer
 */
public interface IdentityProvider {
  /**
   * Verifies the Firebase ID token and extracts authentication details
   * 
   * @param token Firebase ID token from the frontend
   * @return AuthTokenDetails containing uid, email, and emailVerified status
   * @throws InvalidTokenException if token is invalid, expired, or malformed
   */
  AuthTokenDetails verify(String token);
}
