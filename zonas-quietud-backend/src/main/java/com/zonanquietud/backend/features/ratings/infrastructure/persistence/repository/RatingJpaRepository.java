package com.zonanquietud.backend.features.ratings.infrastructure.persistence.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zonanquietud.backend.features.ratings.infrastructure.persistence.jpa.RatingJpaEntity;

/**
 * RatingJpaRepository - Spring Data JPA repository for ratings
 * Infrastructure layer
 */
public interface RatingJpaRepository extends JpaRepository<RatingJpaEntity, UUID> {

  /**
   * Find all ratings for a specific map element
   */
  List<RatingJpaEntity> findByMapElementId(UUID mapElementId);

  /**
   * Find all ratings by a specific user
   */
  List<RatingJpaEntity> findByUserId(UUID userId);

  /**
   * Calculate average overall score for a map element
   */
  @Query("SELECT AVG(r.overallScore) FROM RatingJpaEntity r WHERE r.mapElementId = :mapElementId")
  Double calculateAverageScore(@Param("mapElementId") UUID mapElementId);
}
