package com.zonanquietud.backend.features.ratings.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.zonanquietud.backend.features.ratings.domain.model.Rating;

/**
 * RatingRepository - Domain repository for ratings
 * Domain layer
 */
public interface RatingRepository {

  /**
   * Save a rating
   */
  Rating save(Rating rating);

  /**
   * Find rating by ID
   */
  Optional<Rating> findById(UUID id);

  /**
   * Find all ratings for a map element
   */
  List<Rating> findByMapElementId(UUID mapElementId);

  /**
   * Find all ratings by a user
   */
  List<Rating> findByUserId(UUID userId);

  /**
   * Calculate average overall score for a map element
   */
  Double calculateAverageScore(UUID mapElementId);

  /**
   * Count total ratings
   */
  long count();
}
