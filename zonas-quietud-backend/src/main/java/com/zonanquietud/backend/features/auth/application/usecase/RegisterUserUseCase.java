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
 * RegisterUserUseCase - Maneja el registro de usuarios con lógica upsert
 * Capa de aplicación - orquesta lógica de dominio
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

    AuthTokenDetails details = identityProvider.verify(request.firebaseToken());
    UserEmail email = new UserEmail(details.email());

    log.info("Firebase token verified for registration: {}, emailVerified: {}",
        details.email(), details.emailVerified());

    Optional<Usuario> existingUser = userRepository.findByEmail(email);

    Usuario usuario;
    boolean isNewUser = existingUser.isEmpty();

    if (existingUser.isPresent()) {
      log.info("User already exists with email: {}, updating data", email.getValue());
      usuario = existingUser.get();

      usuario.setFirebaseUid(details.uid());

      usuario.setFirstName(request.firstName());
      usuario.setLastName(request.lastName());
      usuario.setPhone(request.phone());
      usuario.setBirthDate(request.birthDate());
      usuario.setGender(request.gender());

      usuario.setVerified(details.emailVerified());

    } else {
      log.info("Creating new user with email: {}", email.getValue());
      usuario = Usuario.builder()
          .email(email)
          .firebaseUid(details.uid())
          .firstName(request.firstName())
          .lastName(request.lastName())
          .phone(request.phone())
          .birthDate(request.birthDate())
          .gender(request.gender())
          .isVerified(details.emailVerified())
          .isActive(true)
          .build();
    }

    usuario = userRepository.save(usuario);

    String accessToken = jwtTokenProvider.generateAccessToken(usuario);
    String refreshToken = jwtTokenProvider.generateRefreshToken(usuario);

    log.info("User {} successfully: {}, emailVerified: {}",
        isNewUser ? "registered" : "updated", usuario.getId(), usuario.isVerified());

    if (isNewUser) {
      eventPublisher.publishEvent(
          new UserRegisteredEvent(usuario.getId(), email, LocalDateTime.now()));
    }

    UserResponse userResponse = mapper.toUserResponse(usuario);
    TokenResponse tokenResponse = TokenResponse.of(
        accessToken,
        refreshToken,
        jwtProperties.accessTokenExpiration());
    return new AuthResponse(userResponse, tokenResponse);
  }
}
