package com.zonanquietud.backend.features.auth.application.usecase;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.auth.controller.dto.UserResponse;
import com.zonanquietud.backend.features.auth.domain.exception.UserNotFoundException;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;
import com.zonanquietud.backend.features.auth.infrastructure.mapper.AuthMapper;
import com.zonanquietud.backend.features.auth.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetCurrentUserUseCase {

  private final JwtTokenProvider jwtTokenProvider;
  private final UserRepository userRepository;
  private final AuthMapper mapper;

  public UserResponse execute(String token) {
    try {
      log.info("Getting current user from token");

      jwtTokenProvider.validateToken(token);
      UUID userId = jwtTokenProvider.getUserIdFromToken(token);

      log.debug("Extracted user ID from token: {}", userId);
      Usuario usuario = userRepository.findById(userId)
          .orElseThrow(() -> {
            log.error("User not found for ID: {}", userId);
            return UserNotFoundException.byId(userId.toString());
          });

      log.info("Current user retrieved successfully: {}", usuario.getId());

      return mapper.toUserResponse(usuario);

    } catch (Exception e) {
      log.error("Error getting current user", e);
      throw e;
    }
  }
}
