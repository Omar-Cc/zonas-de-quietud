package com.zonanquietud.backend.features.auth.domain.port;

import com.zonanquietud.backend.features.auth.domain.model.AuthTokenDetails;

/**
 * IdentityProvider - Puerto para verificación de identidad externa
 * Abstrae la autenticación de Firebase de la capa de dominio
 */
public interface IdentityProvider {
  /**
   * Verifica el token ID de Firebase y extrae detalles de autenticación
   * 
   * @param token Token ID de Firebase desde el frontend
   * @return AuthTokenDetails conteniendo uid, email y estado de verificación de
   *         email
   * @throws InvalidTokenException si el token es inválido, expirado o malformado
   */
  AuthTokenDetails verify(String token);
}
