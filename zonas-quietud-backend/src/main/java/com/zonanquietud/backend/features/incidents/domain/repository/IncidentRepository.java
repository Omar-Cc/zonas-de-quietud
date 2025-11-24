package com.zonanquietud.backend.features.incidents.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.zonanquietud.backend.features.incidents.domain.model.Incident;

/**
 * IncidentRepository - Domain repository for incidents
 * Domain layer
 */
public interface IncidentRepository {

  /**
   * Save an incident
   */
  Incident save(Incident incident);

  /**
   * Find incident by ID
   */
  Optional<Incident> findById(UUID id);

  /**
   * Find all incidents for a map element
   */
  List<Incident> findByMapElementId(UUID mapElementId);

  /**
   * Find all incidents by a reporter
   */
  List<Incident> findByReporterId(UUID reporterId);

  /**
   * Count total incidents
   */
  long count();
}
