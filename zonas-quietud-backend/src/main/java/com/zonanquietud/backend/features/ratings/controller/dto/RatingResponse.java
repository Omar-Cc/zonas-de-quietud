package com.zonanquietud.backend.features.ratings.controller.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * RatingResponse - DTO for rating responses
 * Controller layer
 */
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
