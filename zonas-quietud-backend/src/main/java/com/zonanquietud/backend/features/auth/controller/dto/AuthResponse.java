package com.zonanquietud.backend.features.auth.controller.dto;

/**
 * AuthResponse - Respuesta de autenticación combinada
 * Contiene tanto información del usuario como tokens JWT
 * Usado en endpoints de login y registro para proveer datos completos de
 * autenticación al frontend
 */
public record AuthResponse(
        UserResponse user,
        TokenResponse tokens) {
}
