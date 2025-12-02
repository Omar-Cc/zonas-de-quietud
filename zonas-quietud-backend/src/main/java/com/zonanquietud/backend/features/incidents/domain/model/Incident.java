package com.zonanquietud.backend.features.incidents.domain.model;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.locationtech.jts.geom.Point;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * Incident - Modelo de dominio para reportes de incidentes
 * Capa de dominio
 */
@Getter
@Builder
@AllArgsConstructor
public class Incident {

  private UUID id;
  private UUID reporterId;
  private UUID mapElementId;
  private IncidentType type;
  private IncidentSeverity severity;
  private IncidentUrgency urgency;
  private String description;
  private Boolean isAnonymous;
  private Boolean notifyAuthorities;
  private List<String> evidencePhotos;
  private Point location;
  private Double locationAccuracy;
  private IncidentStatus status;
  private Instant createdAt;
  private Instant updatedAt;

  /** Validar datos del incidente */
  public void validate() {
    if (reporterId == null) {
      throw new IllegalArgumentException("reporterId cannot be null");
    }
    if (mapElementId == null) {
      throw new IllegalArgumentException("mapElementId cannot be null");
    }
    if (type == null) {
      throw new IllegalArgumentException("type cannot be null");
    }
    if (severity == null) {
      throw new IllegalArgumentException("severity cannot be null");
    }
    if (urgency == null) {
      throw new IllegalArgumentException("urgency cannot be null");
    }
    if (description == null || description.trim().isEmpty()) {
      throw new IllegalArgumentException("description cannot be empty");
    }
    if (location == null) {
      throw new IllegalArgumentException("location cannot be null");
    }
    if (status == null) {
      throw new IllegalArgumentException("status cannot be null");
    }
  }
}
