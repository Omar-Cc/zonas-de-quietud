package com.zonanquietud.backend.features.incidents.controller.dto;

import jakarta.validation.constraints.NotNull;

/** IncidentLocationDto - DTO para ubicación de incidente con precisión */
public record IncidentLocationDto(
    @NotNull(message = "latitude is required") Double latitude,

    @NotNull(message = "longitude is required") Double longitude,

    Double accuracy) {
}
