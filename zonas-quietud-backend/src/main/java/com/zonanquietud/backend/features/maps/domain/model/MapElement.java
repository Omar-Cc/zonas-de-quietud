package com.zonanquietud.backend.features.maps.domain.model;

import java.util.UUID;

import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.MultiLineString;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Polygon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * MapElement - Elemento urbano en el mapa
 * Domain model - Rich domain object with validation
 * 
 * Representa calles (STREET) o zonas (ZONE) con geometría espacial
 */
@Getter
@Builder
@AllArgsConstructor
public class MapElement {

  private UUID id;
  private String name;
  private ElementType type;
  private Double score;
  private Geometry geometry;

  /**
   * Validates that geometry type matches element type
   */
  public void validate() {
    if (name == null || name.isBlank()) {
      throw new IllegalArgumentException("Name cannot be null or empty");
    }

    if (type == null) {
      throw new IllegalArgumentException("Type cannot be null");
    }

    if (geometry == null) {
      throw new IllegalArgumentException("Geometry cannot be null");
    }

    if (score == null || score < 0 || score > 10) {
      throw new IllegalArgumentException("Score must be between 0 and 10");
    }

    // Validate geometry type matches element type
    validateGeometryType();
  }

  private void validateGeometryType() {
    switch (type) {
      case STREET:
        if (!(geometry instanceof LineString || geometry instanceof MultiLineString)) {
          throw new IllegalArgumentException(
              "STREET elements must have LineString or MultiLineString geometry");
        }
        break;
      case ZONE:
        if (!(geometry instanceof Polygon || geometry instanceof MultiPolygon)) {
          throw new IllegalArgumentException(
              "ZONE elements must have Polygon or MultiPolygon geometry");
        }
        break;
    }
  }

  /**
   * Updates the score (rating)
   */
  public void updateScore(Double newScore) {
    if (newScore == null || newScore < 0 || newScore > 10) {
      throw new IllegalArgumentException("Score must be between 0 and 10");
    }
    this.score = newScore;
  }

  /**
   * Sets the score directly (used by rating events)
   * Ensures score stays within bounds
   */
  public void setScore(Double newScore) {
    if (newScore == null) {
      this.score = 5.0; // Default to neutral
    } else {
      this.score = Math.max(0.0, Math.min(10.0, newScore));
    }
  }

  /**
   * Adjusts the score by a delta (used by incident events)
   * Ensures score stays within bounds [0, 10]
   */
  public void adjustScore(double delta) {
    this.score = Math.max(0.0, Math.min(10.0, this.score + delta));
  }

  /**
   * Factory method for creating new elements
   */
  public static MapElement create(String name, ElementType type, Geometry geometry) {
    MapElement element = MapElement.builder()
        .name(name)
        .type(type)
        .geometry(geometry)
        .score(5.0) // Default score
        .build();

    element.validate();
    return element;
  }
}
