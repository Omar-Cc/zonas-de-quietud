package com.zonanquietud.backend.features.ratings.domain.model;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.locationtech.jts.geom.Point;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * Rating - Domain model for street/zone ratings
 * Domain layer
 */
@Getter
@Builder
@AllArgsConstructor
public class Rating {

  private UUID id;
  private UUID userId;
  private UUID mapElementId;
  private Double overallScore;
  private String comments;
  private String ratingType;

  // Detailed ratings (0-10 scale)
  private Double security;
  private Double airQuality;
  private Double noise;
  private Double accessibility;
  private Double tranquility;

  // Photos
  private List<String> photos;

  // Location (exact point where rating was submitted)
  private Point location;

  private Instant createdAt;
  private Instant updatedAt;

  /**
   * Validate rating data
   */
  public void validate() {
    if (userId == null) {
      throw new IllegalArgumentException("userId cannot be null");
    }
    if (mapElementId == null) {
      throw new IllegalArgumentException("mapElementId cannot be null");
    }
    if (location == null) {
      throw new IllegalArgumentException("location cannot be null");
    }

    validateScore(overallScore, "overallScore");
    validateScore(security, "security");
    validateScore(airQuality, "airQuality");
    validateScore(noise, "noise");
    validateScore(accessibility, "accessibility");
    validateScore(tranquility, "tranquility");
  }

  private void validateScore(Double score, String fieldName) {
    if (score != null && (score < 0.0 || score > 10.0)) {
      throw new IllegalArgumentException(
          fieldName + " must be between 0 and 10, got: " + score);
    }
  }
}
