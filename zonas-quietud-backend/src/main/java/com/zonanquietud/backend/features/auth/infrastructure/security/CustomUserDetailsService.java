package com.zonanquietud.backend.features.auth.infrastructure.security;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.auth.domain.exception.UserNotFoundException;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * CustomUserDetailsService - Carga detalles de usuario para Spring Security
 * Infrastructure layer - implementa interfaz de Spring Security
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
    try {
      log.debug("Cargando usuario por ID: {}", userId);

      // Buscar usuario por Firebase UID (que se almacena como userId en JWT)
      Usuario usuario = userRepository.findByFirebaseUid(userId)
          .orElseThrow(() -> {
            log.warn("Usuario no encontrado: {}", userId);
            return new UsernameNotFoundException("Usuario no encontrado: " + userId);
          });

      // Verificar si el usuario está activo
      if (!usuario.isActive()) {
        log.warn("El usuario está inactivo: {}", userId);
        throw new UsernameNotFoundException("El usuario está inactivo: " + userId);
      }

      log.debug("Usuario cargado exitosamente: {}", usuario.getId());

      // Retornar UserDetails de Spring Security
      return User.builder()
          .username(usuario.getId().toString())
          .password("") // No se necesita contraseña para autenticación JWT
          .authorities(Collections.emptyList()) // Agregar roles/autoridades si es necesario
          .accountExpired(false)
          .accountLocked(false)
          .credentialsExpired(false)
          .disabled(!usuario.isActive())
          .build();

    } catch (UserNotFoundException e) {
      throw new UsernameNotFoundException("Usuario no encontrado: " + userId, e);
    } catch (Exception e) {
      log.error("Error al cargar usuario: {}", userId, e);
      throw new UsernameNotFoundException("Error al cargar usuario: " + userId, e);
    }
  }
}
