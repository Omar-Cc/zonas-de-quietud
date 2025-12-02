package com.zonanquietud.backend.features.ratings.controller.dto;

import jakarta.validation.constraints.NotNull;

/**
 * LocationDto - DTO para coordenadas de ubicación
 * DTO compartido para calificaciones e incidentes
 */
public record LocationDto(
    @NotNull(message = "latitude is required") Double latitude,

    @NotNull(message = "longitude is required") Double longitude) {
}
