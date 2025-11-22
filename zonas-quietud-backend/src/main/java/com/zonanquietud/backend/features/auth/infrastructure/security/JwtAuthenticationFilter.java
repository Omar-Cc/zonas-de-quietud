package com.zonanquietud.backend.features.auth.infrastructure.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * JwtAuthenticationFilter - Intercepta solicitudes y valida tokens JWT
 * Infrastructure layer - Filtro de Spring Security
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtTokenProvider jwtTokenProvider;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain) throws ServletException, IOException {

    try {
      // 1. Extraer token JWT del header Authorization
      String token = extractTokenFromRequest(request);

      if (token != null) {
        log.trace("Token JWT encontrado en la solicitud");

        // 2. Validar token
        if (jwtTokenProvider.validateToken(token)) {
          log.trace("Token JWT es válido");

          // 3. Extraer ID de usuario del token
          String userId = jwtTokenProvider.getUserIdFromToken(token).toString();

          // 4. Cargar detalles del usuario
          UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

          // 5. Crear objeto de autenticación
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
              userDetails,
              null,
              userDetails.getAuthorities());

          authentication.setDetails(
              new WebAuthenticationDetailsSource().buildDetails(request));

          // 6. Establecer autenticación en el contexto de seguridad
          SecurityContextHolder.getContext().setAuthentication(authentication);

          log.debug("Usuario autenticado: {}", userId);
        }
      }
    } catch (Exception e) {
      log.error("No se puede establecer la autenticación del usuario", e);
      // No lanzar excepción, dejar que la solicitud continúe
      // Spring Security manejará el acceso no autorizado
    }

    filterChain.doFilter(request, response);
  }

  /**
   * Extrae el token JWT del header Authorization
   */
  private String extractTokenFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");

    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }

    return null;
  }
}
