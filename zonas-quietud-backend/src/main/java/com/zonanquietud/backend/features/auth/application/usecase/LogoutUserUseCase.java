package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.auth.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * LogoutUserUseCase - Handles user logout
 * Application layer - orchestrates domain logic
 * 
 * Note: With JWT, logout is typically handled client-side by removing the
 * token.
 * This use case can be extended to implement token blacklisting if needed.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LogoutUserUseCase {

  private final JwtTokenProvider jwtTokenProvider;

  public void execute(String token) {
    try {
      log.info("Processing logout request");

      // Validate token before logout
      jwtTokenProvider.validateToken(token);

      // TODO: Implement token blacklisting if needed
      // For now, logout is handled client-side by removing the token

      log.info("Logout processed successfully");
    } catch (Exception e) {
      log.error("Error processing logout", e);
      throw e;
    }
  }
}
