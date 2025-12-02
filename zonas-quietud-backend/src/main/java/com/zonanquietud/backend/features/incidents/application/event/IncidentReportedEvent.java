package com.zonanquietud.backend.features.incidents.application.event;

import java.time.Instant;
import java.util.UUID;

import com.zonanquietud.backend.features.incidents.domain.model.IncidentSeverity;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentType;

/**
 * IncidentReportedEvent - Evento publicado cuando se reporta un incidente
 * Capa de aplicación - Evento de dominio
 */
public record IncidentReportedEvent(
        UUID incidentId,
        UUID mapElementId,
        IncidentSeverity severity,
        IncidentType type,
        Instant reportedAt) {
}
