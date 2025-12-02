package com.zonanquietud.backend.features.incidents.controller.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.zonanquietud.backend.features.incidents.domain.model.IncidentSeverity;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentStatus;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentType;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentUrgency;

/** IncidentResponse - DTO para respuestas de incidentes */
public record IncidentResponse(
    UUID id,
    UUID reporterId,
    UUID mapElementId,
    IncidentType type,
    IncidentSeverity severity,
    IncidentUrgency urgency,
    String description,
    Boolean isAnonymous,
    Boolean notifyAuthorities,
    List<String> evidencePhotos,
    IncidentLocationDto location,
    IncidentStatus status,
    Instant createdAt) {
}
