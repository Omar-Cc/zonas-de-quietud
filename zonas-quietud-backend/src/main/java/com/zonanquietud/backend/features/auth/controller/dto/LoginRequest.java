package com.zonanquietud.backend.features.auth.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank(message = "Firebase token es requerido") String firebaseToken) {
}
