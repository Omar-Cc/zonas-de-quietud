package com.zonanquietud.backend.features.auth.application.usecase;

import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.auth.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * LogoutUserUseCase - Maneja el cierre de sesión del usuario
 * Capa de aplicación - orquesta lógica de dominio
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LogoutUserUseCase {

  private final JwtTokenProvider jwtTokenProvider;

  public void execute(String token) {
    try {
      log.info("Processing logout request");

      jwtTokenProvider.validateToken(token);

      // TODO: Implementar lista negra de tokens

      log.info("Logout processed successfully");
    } catch (Exception e) {
      log.error("Error processing logout", e);
      throw e;
    }
  }
}
