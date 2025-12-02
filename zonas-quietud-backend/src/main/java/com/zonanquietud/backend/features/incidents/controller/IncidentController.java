package com.zonanquietud.backend.features.incidents.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zonanquietud.backend.features.incidents.application.usecase.ReportIncidentUseCase;
import com.zonanquietud.backend.features.incidents.controller.dto.IncidentResponse;
import com.zonanquietud.backend.features.incidents.controller.dto.ReportIncidentRequest;
import com.zonanquietud.backend.shared.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * IncidentController - API REST para incidentes
 * Capa de controlador - Endpoints HTTP
 */
@RestController
@RequestMapping("/api/v1/incidents")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Incidents", description = "Incident reporting endpoints")
public class IncidentController {

  private final ReportIncidentUseCase reportIncidentUseCase;

  /** Reportar un nuevo incidente */
  @PostMapping
  @Operation(summary = "Report incident", description = "Report a new incident with location, severity, and optional evidence photos")
  public ResponseEntity<ApiResponse<IncidentResponse>> reportIncident(
      @Valid @RequestBody ReportIncidentRequest request) {
    log.info("POST /api/v1/incidents - streetId: {}, type: {}, severity: {}",
        request.streetId(), request.incidentType(), request.severity());

    IncidentResponse response = reportIncidentUseCase.execute(request);

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.exito(response, "Incident reported successfully"));
  }
}
