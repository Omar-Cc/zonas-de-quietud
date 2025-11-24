package com.zonanquietud.backend.features.ratings.controller.dto;

import jakarta.validation.constraints.NotNull;

/**
 * LocationDto - DTO for location coordinates
 * Shared DTO for both ratings and incidents
 */
public record LocationDto(
    @NotNull(message = "latitude is required") Double latitude,

    @NotNull(message = "longitude is required") Double longitude) {
}
