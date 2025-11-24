package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonanquietud.backend.features.auth.controller.dto.AuthResponse;
import com.zonanquietud.backend.features.auth.controller.dto.LoginRequest;
import com.zonanquietud.backend.features.auth.controller.dto.TokenResponse;
import com.zonanquietud.backend.features.auth.controller.dto.UserResponse;
import com.zonanquietud.backend.features.auth.domain.event.UserLoggedInEvent;
import com.zonanquietud.backend.features.auth.domain.exception.UserNotFoundException;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginUserUseCase {

  private final IdentityProvider identityProvider;
  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtProperties jwtProperties;
  private final ApplicationEventPublisher eventPublisher;
  private final AuthMapper mapper;

  @Transactional
  public AuthResponse execute(LoginRequest request) {
    log.info("Attempting login with Firebase token");

    AuthTokenDetails details = identityProvider.verify(request.firebaseToken());
    UserEmail email = new UserEmail(details.email());

    log.info("Firebase token verified for user: {}, emailVerified: {}",
        details.email(), details.emailVerified());

    Usuario usuario = userRepository.findByFirebaseUid(details.uid())
        .orElseGet(() -> {
          log.info("User not found by UID, attempting to find by email: {}", details.email());
          return userRepository.findByEmail(email)
              .map(user -> {
                log.info("Merging user account - updating Firebase UID for: {}", details.email());
                user.setFirebaseUid(details.uid());
                return user;
              })
              .orElseThrow(() -> {
                log.warn("Login failed: user not registered with email: {}", details.email());
                return UserNotFoundException.byEmail(details.email());
              });
        });

    usuario.setVerified(details.emailVerified());
    usuario.updateLastLogin();
    usuario = userRepository.save(usuario);

    log.info("User logged in successfully: {}, emailVerified: {}",
        usuario.getId(), usuario.isVerified());

    String accessToken = jwtTokenProvider.generateAccessToken(usuario);
    String refreshToken = jwtTokenProvider.generateRefreshToken(usuario);

    eventPublisher.publishEvent(
        new UserLoggedInEvent(usuario.getId(), LocalDateTime.now()));

    UserResponse userResponse = mapper.toUserResponse(usuario);
    TokenResponse tokenResponse = TokenResponse.of(
        accessToken,
        refreshToken,
        jwtProperties.accessTokenExpiration());

    return new AuthResponse(userResponse, tokenResponse);
  }
}
