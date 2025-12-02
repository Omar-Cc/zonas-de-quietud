package com.zonanquietud.backend.features.auth.infrastructure.security;

import java.util.Collections;
import java.util.UUID;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * CustomUserDetailsService - Carga detalles de usuario para Spring Security
 * Infrastructure layer - implementa interfaz de Spring Security
 * 
 * IMPORTANTE: Este servicio usa el UUID INTERNO como identificador,
 * NO el firebaseUid ni el email.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
    try {
      log.debug("Cargando usuario por UUID: {}", userId);

      UUID uuid;
      try {
        uuid = UUID.fromString(userId);
      } catch (IllegalArgumentException e) {
        log.warn("ID de usuario no es un UUID válido: {}", userId);
        throw new UsernameNotFoundException("ID de usuario inválido: " + userId);
      }

      Usuario usuario = userRepository.findById(uuid)
          .orElseThrow(() -> {
            log.warn("Usuario no encontrado con UUID: {}", uuid);
            return new UsernameNotFoundException("Usuario no encontrado: " + uuid);
          });

      if (!usuario.isActive()) {
        log.warn("El usuario está inactivo: {}", uuid);
        throw new UsernameNotFoundException("El usuario está inactivo: " + uuid);
      }

      log.debug("Usuario cargado exitosamente: {}", usuario.getId());

      return User.builder()
          .username(usuario.getId().toString())
          .password("")
          .authorities(Collections.emptyList())
          .accountExpired(false)
          .accountLocked(false)
          .credentialsExpired(false)
          .disabled(!usuario.isActive())
          .build();

    } catch (UsernameNotFoundException e) {
      throw e;
    } catch (Exception e) {
      log.error("Error al cargar usuario: {}", userId, e);
      throw new UsernameNotFoundException("Error al cargar usuario: " + userId, e);
    }
  }
}
