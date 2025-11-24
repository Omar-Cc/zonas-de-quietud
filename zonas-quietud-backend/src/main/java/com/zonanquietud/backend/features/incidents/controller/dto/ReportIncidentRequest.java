package com.zonanquietud.backend.features.incidents.controller.dto;

import java.util.List;
import java.util.UUID;

import com.zonanquietud.backend.features.incidents.domain.model.IncidentSeverity;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentType;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentUrgency;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

/**
 * ReportIncidentRequest - DTO for incident reporting
 * Controller layer - Matches frontend payload
 */
public record ReportIncidentRequest(
    @NotNull(message = "streetId is required") UUID streetId,

    @NotNull(message = "userId is required") UUID userId,

    @NotNull(message = "incidentType is required") IncidentType incidentType,

    @NotNull(message = "severity is required") IncidentSeverity severity,

    @NotNull(message = "urgency is required") IncidentUrgency urgency,

    @NotNull(message = "description is required") String description,

    Boolean isAnonymous,

    Boolean notifyAuthorities,

    List<String> evidencePhotos,

    @NotNull(message = "location is required") @Valid IncidentLocationDto location) {
}
