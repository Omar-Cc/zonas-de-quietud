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
 * Modelo de dominio - Objeto de dominio rico con validación
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

  /** Valida que el tipo de geometría coincida con el tipo de elemento */
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

  /** Actualiza el puntaje (calificación) */
  public void updateScore(Double newScore) {
    if (newScore == null || newScore < 0 || newScore > 10) {
      throw new IllegalArgumentException("Score must be between 0 and 10");
    }
    this.score = newScore;
  }

  /**
   * Establece el puntaje directamente (usado por eventos de calificación)
   * Asegura que el puntaje se mantenga dentro de los límites
   */
  public void setScore(Double newScore) {
    if (newScore == null) {
      this.score = 5.0;
    } else {
      this.score = Math.max(0.0, Math.min(10.0, newScore));
    }
  }

  /**
   * Ajusta el puntaje por un delta (usado por eventos de incidentes)
   * Asegura que el puntaje se mantenga dentro de los límites [0, 10]
   */
  public void adjustScore(double delta) {
    this.score = Math.max(0.0, Math.min(10.0, this.score + delta));
  }

  /** Método factory para crear nuevos elementos */
  public static MapElement create(String name, ElementType type, Geometry geometry) {
    MapElement element = MapElement.builder()
        .name(name)
        .type(type)
        .geometry(geometry)
        .score(5.0)
        .build();

    element.validate();
    return element;
  }
}
