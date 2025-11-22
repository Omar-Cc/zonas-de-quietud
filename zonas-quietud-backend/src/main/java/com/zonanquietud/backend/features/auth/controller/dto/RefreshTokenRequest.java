package com.zonanquietud.backend.features.auth.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequest(
    @NotBlank(message = "Refresh token es requerido") String refreshToken) {
}
