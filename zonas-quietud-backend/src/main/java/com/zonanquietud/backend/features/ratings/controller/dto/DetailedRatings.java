package com.zonanquietud.backend.features.ratings.controller.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

/**
 * DetailedRatings - Nested DTO for detailed rating scores
 * Controller layer
 */
public record DetailedRatings(
    @Min(value = 0, message = "security must be >= 0") @Max(value = 10, message = "security must be <= 10") Double security,

    @Min(value = 0, message = "airQuality must be >= 0") @Max(value = 10, message = "airQuality must be <= 10") Double airQuality,

    @Min(value = 0, message = "noise must be >= 0") @Max(value = 10, message = "noise must be <= 10") Double noise,

    @Min(value = 0, message = "accessibility must be >= 0") @Max(value = 10, message = "accessibility must be <= 10") Double accessibility,

    @Min(value = 0, message = "tranquility must be >= 0") @Max(value = 10, message = "tranquility must be <= 10") Double tranquility) {
}
