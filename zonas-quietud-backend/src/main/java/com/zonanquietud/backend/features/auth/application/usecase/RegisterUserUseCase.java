package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonanquietud.backend.features.auth.controller.dto.AuthResponse;
import com.zonanquietud.backend.features.auth.controller.dto.RegisterRequest;
import com.zonanquietud.backend.features.auth.controller.dto.TokenResponse;
import com.zonanquietud.backend.features.auth.controller.dto.UserResponse;
import com.zonanquietud.backend.features.auth.domain.event.UserRegisteredEvent;
import com.zonanquietud.backend.features.auth.domain.model.AuthTokenDetails;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.port.IdentityProvider;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;
import com.zonanquietud.backend.features.auth.infrastructure.config.JwtProperties;
import com.zonanquietud.backend.features.auth.infrastructure.mapper.AuthMapper;
import com.zonanquietud.backend.features.auth.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * RegisterUserUseCase - Handles user registration with upsert logic
 * Application layer - orchestrates domain logic
 * 
 * This use case implements idempotent registration:
 * - If user exists: updates their data and emailVerified status
 * - If user is new: creates them with emailVerified status from Firebase
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RegisterUserUseCase {

  private final IdentityProvider identityProvider;
  private final UserRepository userRepository;
  private final AuthMapper mapper;
  private final ApplicationEventPublisher eventPublisher;
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtProperties jwtProperties;

  @Transactional
  public AuthResponse execute(RegisterRequest request) {
    log.info("Attempting to register user");

    // 1. Verify Firebase token and get authentication details
    AuthTokenDetails details = identityProvider.verify(request.firebaseToken());
    UserEmail email = new UserEmail(details.email());

    log.info("Firebase token verified for registration: {}, emailVerified: {}",
        details.email(), details.emailVerified());

    // 2. Find existing user by email
    Optional<Usuario> existingUser = userRepository.findByEmail(email);

    Usuario usuario;
    boolean isNewUser = existingUser.isEmpty();

    if (existingUser.isPresent()) {
      // UPSERT: Update existing user
      log.info("User already exists with email: {}, updating data", email.getValue());
      usuario = existingUser.get();

      // Update Firebase UID (in case of provider change)
      usuario.setFirebaseUid(details.uid());

      // Update personal data
      usuario.setFirstName(request.firstName());
      usuario.setLastName(request.lastName());
      usuario.setPhone(request.phone());
      usuario.setBirthDate(request.birthDate());
      usuario.setGender(request.gender());

      // CRITICAL: Sync email verification status from Firebase
      usuario.setVerified(details.emailVerified());

    } else {
      // CREATE: New user
      log.info("Creating new user with email: {}", email.getValue());
      usuario = Usuario.builder()
          .email(email)
          .firebaseUid(details.uid())
          .firstName(request.firstName())
          .lastName(request.lastName())
          .phone(request.phone())
          .birthDate(request.birthDate())
          .gender(request.gender())
          .isVerified(details.emailVerified()) // Set from Firebase
          .isActive(true)
          .build();
    }

    // 3. Save user (create or update)
    usuario = userRepository.save(usuario);

    String accessToken = jwtTokenProvider.generateAccessToken(usuario);
    String refreshToken = jwtTokenProvider.generateRefreshToken(usuario);

    log.info("User {} successfully: {}, emailVerified: {}",
        isNewUser ? "registered" : "updated", usuario.getId(), usuario.isVerified());

    // 4. Publish domain event (only for new users)
    if (isNewUser) {
      eventPublisher.publishEvent(
          new UserRegisteredEvent(usuario.getId(), email, LocalDateTime.now()));
    }

    UserResponse userResponse = mapper.toUserResponse(usuario);
    TokenResponse tokenResponse = TokenResponse.of(
        accessToken,
        refreshToken,
        jwtProperties.accessTokenExpiration());
    // 5. Return user response
    return new AuthResponse(userResponse, tokenResponse);
  }
}
