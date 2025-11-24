package com.zonanquietud.backend.features.ratings.infrastructure.persistence.jpa;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.locationtech.jts.geom.Point;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * RatingJpaEntity - JPA entity for ratings with PostGIS support
 * Infrastructure layer
 */
@Entity
@Table(name = "ratings")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingJpaEntity {

  @Id
  private UUID id;

  @Column(name = "user_id", nullable = false)
  private UUID userId;

  @Column(name = "map_element_id", nullable = false)
  private UUID mapElementId;

  @Column(name = "overall_score", nullable = false)
  private Double overallScore;

  @Column(name = "comments", columnDefinition = "TEXT")
  private String comments;

  @Column(name = "rating_type")
  private String ratingType;

  // Detailed ratings
  @Column(name = "security")
  private Double security;

  @Column(name = "air_quality")
  private Double airQuality;

  @Column(name = "noise")
  private Double noise;

  @Column(name = "accessibility")
  private Double accessibility;

  @Column(name = "tranquility")
  private Double tranquility;

  // Photos stored in separate table
  @ElementCollection
  @CollectionTable(name = "rating_photos", joinColumns = @JoinColumn(name = "rating_id"))
  @Column(name = "photo_url")
  private List<String> photos;

  // Location as PostGIS Point
  @Column(name = "location", columnDefinition = "GEOMETRY(Point, 4326)", nullable = false)
  private Point location;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;
}
