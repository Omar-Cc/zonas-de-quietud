package com.zonanquietud.backend.features.incidents.controller.dto;

import jakarta.validation.constraints.NotNull;

/**
 * IncidentLocationDto - DTO for incident location with accuracy
 * Controller layer
 */
public record IncidentLocationDto(
    @NotNull(message = "latitude is required") Double latitude,

    @NotNull(message = "longitude is required") Double longitude,

    Double accuracy) {
}
