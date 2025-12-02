package com.zonanquietud.backend.features.incidents.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.incidents.domain.model.Incident;
import com.zonanquietud.backend.features.incidents.infrastructure.persistence.jpa.IncidentJpaEntity;

/**
 * IncidentMapper - Mapeador bidireccional entre dominio y entidades JPA
 * Capa de infraestructura
 */
@Component
public class IncidentMapper {

  /** Convertir modelo de dominio a entidad JPA */
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

  /** Convertir entidad JPA a modelo de dominio */
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
