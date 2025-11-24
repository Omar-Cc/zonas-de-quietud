package com.zonanquietud.backend.features.incidents.application.event;

import java.time.Instant;
import java.util.UUID;

import com.zonanquietud.backend.features.incidents.domain.model.IncidentSeverity;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentType;

/**
 * IncidentReportedEvent - Event published when an incident is reported
 * Application layer - Domain event
 */
public record IncidentReportedEvent(
    UUID incidentId,
    UUID mapElementId,
    IncidentSeverity severity,
    IncidentType type,
    Instant reportedAt) {
}
