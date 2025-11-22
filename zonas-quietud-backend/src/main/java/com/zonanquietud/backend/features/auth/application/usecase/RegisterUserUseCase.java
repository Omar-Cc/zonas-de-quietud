package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonanquietud.backend.features.auth.controller.dto.RegisterRequest;
import com.zonanquietud.backend.features.auth.controller.dto.UserResponse;
import com.zonanquietud.backend.features.auth.domain.event.UserRegisteredEvent;
import com.zonanquietud.backend.features.auth.domain.exception.EmailAlreadyInUseException;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.port.IdentityProvider;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;
import com.zonanquietud.backend.features.auth.infrastructure.mapper.AuthMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

/**
 * RegisterUserUseCase - Handles user registration
 * Application layer - orchestrates domain logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RegisterUserUseCase {

  private final IdentityProvider identityProvider;
  private final UserRepository userRepository;
  private final AuthMapper mapper;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public UserResponse execute(RegisterRequest request) {
    log.info("Attempting to register new user");

    // 1. Verify Firebase token and get email
    String firebaseUid = identityProvider.verifyToken(request.firebaseToken());
    UserEmail email = identityProvider.getEmailFromToken(request.firebaseToken());

    log.info("Firebase token verified for registration: {}", email.getValue());

    // 2. Check if email already exists
    if (userRepository.existsByEmail(email)) {
      log.warn("Registration failed: email already in use: {}", email.getValue());
      throw EmailAlreadyInUseException.forEmail(email.getValue());
    }

    // 3. Create new user
    Usuario usuario = Usuario.builder()
        .email(email)
        .firebaseUid(firebaseUid)
        .firstName(request.firstName())
        .lastName(request.lastName())
        .phone(request.phone())
        .birthDate(request.birthDate())
        .gender(request.gender())
        .build();

    // 4. Save user
    usuario = userRepository.save(usuario);

    log.info("User registered successfully: {}", usuario.getId());

    // 5. Publish domain event
    eventPublisher.publishEvent(
        new UserRegisteredEvent(usuario.getId(), email, LocalDateTime.now()));

    // 6. Return user response
    return mapper.toUserResponse(usuario);
  }
}
