package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonanquietud.backend.features.auth.controller.dto.LoginRequest;
import com.zonanquietud.backend.features.auth.controller.dto.TokenResponse;
import com.zonanquietud.backend.features.auth.domain.event.UserLoggedInEvent;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.port.IdentityProvider;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;
import com.zonanquietud.backend.features.auth.infrastructure.config.JwtProperties;
import com.zonanquietud.backend.features.auth.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

/**
 * LoginUserUseCase - Handles user login
 * Application layer - orchestrates domain logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LoginUserUseCase {

  private final IdentityProvider identityProvider;
  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtProperties jwtProperties;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public TokenResponse execute(LoginRequest request) {
    log.info("Attempting login with Firebase token");

    // 1. Verify Firebase token and get user info
    String firebaseUid = identityProvider.verifyToken(request.firebaseToken());
    UserEmail email = identityProvider.getEmailFromToken(request.firebaseToken());

    log.info("Firebase token verified for user: {}", email.getValue());

    // 2. Find or create user
    Usuario usuario = userRepository.findByFirebaseUid(firebaseUid)
        .orElseGet(() -> {
          log.info("User not found, creating new user for: {}", email.getValue());
          // Extract name from email (simple approach)
          String emailLocal = email.getValue().split("@")[0];
          Usuario newUser = Usuario.createNew(
              email,
              firebaseUid,
              emailLocal, // firstName
              emailLocal // lastName
          );
          return userRepository.save(newUser);
        });

    // 3. Update last login
    usuario.updateLastLogin();
    usuario = userRepository.save(usuario);

    log.info("User logged in successfully: {}", usuario.getId());

    // 4. Generate JWT tokens
    String accessToken = jwtTokenProvider.generateAccessToken(usuario);
    String refreshToken = jwtTokenProvider.generateRefreshToken(usuario);

    // 5. Publish domain event
    eventPublisher.publishEvent(
        new UserLoggedInEvent(usuario.getId(), LocalDateTime.now()));

    // 6. Return token response
    return TokenResponse.of(
        accessToken,
        refreshToken,
        jwtProperties.accessTokenExpiration());
  }
}
