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
 * RefreshTokenUseCase - Maneja la actualización de tokens
 * Capa de aplicación - orquesta lógica de dominio
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

    jwtTokenProvider.validateToken(refreshToken);

    UUID userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

    Usuario usuario = userRepository.findById(userId)
        .orElseThrow(() -> {
          log.error("User not found for token refresh: {}", userId);
          return UserNotFoundException.byId(userId.toString());
        });

    log.info("Generating new access token for user: {}", usuario.getId());

    String newAccessToken = jwtTokenProvider.generateAccessToken(usuario);

    return TokenResponse.of(
        newAccessToken,
        refreshToken,
        jwtProperties.accessTokenExpiration());
  }
}
