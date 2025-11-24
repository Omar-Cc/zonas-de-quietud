package com.zonanquietud.backend.features.incidents.application.usecase;

import java.time.Instant;
import java.util.UUID;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.incidents.application.event.IncidentReportedEvent;
import com.zonanquietud.backend.features.incidents.controller.dto.IncidentLocationDto;
import com.zonanquietud.backend.features.incidents.controller.dto.IncidentResponse;
import com.zonanquietud.backend.features.incidents.controller.dto.ReportIncidentRequest;
import com.zonanquietud.backend.features.incidents.domain.model.Incident;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentStatus;
import com.zonanquietud.backend.features.incidents.domain.repository.IncidentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * ReportIncidentUseCase - Report a new incident
 * Application layer - Business logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ReportIncidentUseCase {

	private final IncidentRepository repository;
	private final ApplicationEventPublisher eventPublisher;
	private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

	/**
	 * Execute incident reporting
	 */
	public IncidentResponse execute(ReportIncidentRequest request) {
		log.info("Reporting incident for element {} by user {}: type={}, severity={}",
				request.streetId(), request.userId(), request.incidentType(), request.severity());

		// Convert lat/lng to PostGIS Point
		Point location = geometryFactory.createPoint(
				new Coordinate(request.location().longitude(),
						request.location().latitude()));

		// Create domain model
		Incident incident = Incident.builder()
				.id(UUID.randomUUID())
				.reporterId(request.userId())
				.mapElementId(request.streetId())
				.type(request.incidentType())
				.severity(request.severity())
				.urgency(request.urgency())
				.description(request.description())
				.isAnonymous(Boolean.TRUE.equals(request.isAnonymous()))
				.notifyAuthorities(Boolean.TRUE.equals(request.notifyAuthorities()))
				.evidencePhotos(request.evidencePhotos())
				.location(location)
				.locationAccuracy(request.location().accuracy())
				.status(IncidentStatus.PENDING)
				.build();

		// Save incident
		Incident saved = repository.save(incident);

		log.info("Incident saved with ID {}. Status: {}", saved.getId(), saved.getStatus());

		// Publish event to update map
		eventPublisher.publishEvent(new IncidentReportedEvent(
				saved.getId(),
				request.streetId(),
				request.severity(),
				request.incidentType(),
				Instant.now()));

		return toResponse(saved);
	}

	/**
	 * Convert domain model to response DTO
	 */
	private IncidentResponse toResponse(Incident incident) {
		// Convert Point back to lat/lng
		IncidentLocationDto location = new IncidentLocationDto(
				incident.getLocation().getY(), // latitude
				incident.getLocation().getX(), // longitude
				incident.getLocationAccuracy());

		return new IncidentResponse(
				incident.getId(),
				incident.getReporterId(),
				incident.getMapElementId(),
				incident.getType(),
				incident.getSeverity(),
				incident.getUrgency(),
				incident.getDescription(),
				incident.getIsAnonymous(),
				incident.getNotifyAuthorities(),
				incident.getEvidencePhotos(),
				location,
				incident.getStatus(),
				incident.getCreatedAt());
	}
}
