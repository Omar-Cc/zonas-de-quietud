package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.auth.controller.dto.TokenResponse;
import com.zonanquietud.backend.features.auth.domain.exception.UserNotFoundException;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;
import com.zonanquietud.backend.features.auth.infrastructure.config.JwtProperties;
import com.zonanquietud.backend.features.auth.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

/**
 * RefreshTokenUseCase - Handles token refresh
 * Application layer - orchestrates domain logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenUseCase {

  private final JwtTokenProvider jwtTokenProvider;
  private final UserRepository userRepository;
  private final JwtProperties jwtProperties;

  public TokenResponse execute(String refreshToken) {
    log.info("Attempting to refresh access token");

    // 1. Validate refresh token
    jwtTokenProvider.validateToken(refreshToken);

    // 2. Extract user ID from refresh token
    UUID userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

    // 3. Find user
    Usuario usuario = userRepository.findByFirebaseUid(userId.toString())
        .orElseThrow(() -> {
          log.error("User not found for token refresh: {}", userId);
          return UserNotFoundException.byId(userId.toString());
        });

    log.info("Generating new access token for user: {}", usuario.getId());

    // 4. Generate new access token (keep same refresh token)
    String newAccessToken = jwtTokenProvider.generateAccessToken(usuario);

    // 5. Return new token response
    return TokenResponse.of(
        newAccessToken,
        refreshToken, // Keep the same refresh token
        jwtProperties.accessTokenExpiration());
  }
}
