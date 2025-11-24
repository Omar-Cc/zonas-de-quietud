package com.zonanquietud.backend.features.incidents.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.incidents.domain.model.Incident;
import com.zonanquietud.backend.features.incidents.infrastructure.persistence.jpa.IncidentJpaEntity;

/**
 * IncidentMapper - Bidirectional mapper between domain and JPA entities
 * Infrastructure layer
 */
@Component
public class IncidentMapper {

  /**
   * Convert domain model to JPA entity
   */
  public IncidentJpaEntity toEntity(Incident incident) {
    if (incident == null) {
      return null;
    }

    return IncidentJpaEntity.builder()
        .id(incident.getId())
        .reporterId(incident.getReporterId())
        .mapElementId(incident.getMapElementId())
        .type(incident.getType())
        .severity(incident.getSeverity())
        .urgency(incident.getUrgency())
        .description(incident.getDescription())
        .isAnonymous(incident.getIsAnonymous())
        .notifyAuthorities(incident.getNotifyAuthorities())
        .evidencePhotos(incident.getEvidencePhotos())
        .location(incident.getLocation())
        .locationAccuracy(incident.getLocationAccuracy())
        .status(incident.getStatus())
        .createdAt(incident.getCreatedAt())
        .updatedAt(incident.getUpdatedAt())
        .build();
  }

  /**
   * Convert JPA entity to domain model
   */
  public Incident toDomain(IncidentJpaEntity entity) {
    if (entity == null) {
      return null;
    }

    return Incident.builder()
        .id(entity.getId())
        .reporterId(entity.getReporterId())
        .mapElementId(entity.getMapElementId())
        .type(entity.getType())
        .severity(entity.getSeverity())
        .urgency(entity.getUrgency())
        .description(entity.getDescription())
        .isAnonymous(entity.getIsAnonymous())
        .notifyAuthorities(entity.getNotifyAuthorities())
        .evidencePhotos(entity.getEvidencePhotos())
        .location(entity.getLocation())
        .locationAccuracy(entity.getLocationAccuracy())
        .status(entity.getStatus())
        .createdAt(entity.getCreatedAt())
        .updatedAt(entity.getUpdatedAt())
        .build();
  }
}
