package com.zonanquietud.backend.features.ratings.controller.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * RateStreetRequest - DTO para envío de calificación
 * Capa de controlador - Coincide con payload del frontend
 */
public record RateStreetRequest(
    @NotNull(message = "streetId is required") UUID streetId,

    @NotNull(message = "userId is required") UUID userId,

    @NotNull(message = "overallScore is required") @Min(value = 0, message = "overallScore must be >= 0") @Max(value = 10, message = "overallScore must be <= 10") Double overallScore,

    String comments,

    String ratingType,

    @NotNull(message = "detailedRatings is required") @Valid DetailedRatings detailedRatings,

    List<String> photos,

    @NotNull(message = "location is required") @Valid LocationDto location) {
}
