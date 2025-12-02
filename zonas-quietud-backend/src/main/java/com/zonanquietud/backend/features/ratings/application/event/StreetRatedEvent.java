package com.zonanquietud.backend.features.ratings.application.event;

import java.time.Instant;
import java.util.UUID;

/** StreetRatedEvent - Evento publicado cuando se califica una calle/zona */
public record StreetRatedEvent(
    UUID ratingId,
    UUID mapElementId,
    Double newAverageScore,
    Instant ratedAt) {
}
