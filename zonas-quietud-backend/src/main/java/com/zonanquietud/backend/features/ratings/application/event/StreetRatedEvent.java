package com.zonanquietud.backend.features.ratings.application.event;

import java.time.Instant;
import java.util.UUID;

/**
 * StreetRatedEvent - Event published when a street/zone is rated
 * Application layer - Domain event
 */
public record StreetRatedEvent(
    UUID ratingId,
    UUID mapElementId,
    Double newAverageScore,
    Instant ratedAt) {
}
