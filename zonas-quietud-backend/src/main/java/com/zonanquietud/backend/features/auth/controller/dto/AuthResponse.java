package com.zonanquietud.backend.features.auth.controller.dto;

/**
 * AuthResponse - Combined authentication response
 * Contains both user information and JWT tokens
 * Used in login and register endpoints to provide complete auth data to
 * frontend
 */
public record AuthResponse(
    UserResponse user, // User data (name, email, emailVerified, etc.)
    TokenResponse tokens // JWT tokens (access, refresh, expiration)
) {
}
