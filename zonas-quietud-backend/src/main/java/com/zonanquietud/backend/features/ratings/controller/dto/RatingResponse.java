package com.zonanquietud.backend.features.ratings.controller.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** RatingResponse - DTO para respuestas de calificaciones */
public record RatingResponse(
    UUID id,
    UUID userId,
    UUID mapElementId,
    Double overallScore,
    String comments,
    String ratingType,
    DetailedRatings detailedRatings,
    List<String> photos,
    LocationDto location,
    Instant createdAt) {
}
