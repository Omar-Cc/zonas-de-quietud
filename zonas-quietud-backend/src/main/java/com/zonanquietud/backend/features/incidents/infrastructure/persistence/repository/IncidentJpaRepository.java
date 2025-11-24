package com.zonanquietud.backend.features.incidents.infrastructure.persistence.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zonanquietud.backend.features.incidents.infrastructure.persistence.jpa.IncidentJpaEntity;

/**
 * IncidentJpaRepository - Spring Data JPA repository for incidents
 * Infrastructure layer
 */
public interface IncidentJpaRepository extends JpaRepository<IncidentJpaEntity, UUID> {

  /**
   * Find all incidents for a specific map element
   */
  List<IncidentJpaEntity> findByMapElementId(UUID mapElementId);

  /**
   * Find all incidents by a specific reporter
   */
  List<IncidentJpaEntity> findByReporterId(UUID reporterId);
}
