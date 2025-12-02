package com.zonanquietud.backend.features.incidents.infrastructure.persistence.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zonanquietud.backend.features.incidents.infrastructure.persistence.jpa.IncidentJpaEntity;

/** IncidentJpaRepository - Repositorio Spring Data JPA para incidentes */
public interface IncidentJpaRepository extends JpaRepository<IncidentJpaEntity, UUID> {

  /** Buscar todos los incidentes de un elemento del mapa específico */
  List<IncidentJpaEntity> findByMapElementId(UUID mapElementId);

  /** Buscar todos los incidentes de un reportero específico */
  List<IncidentJpaEntity> findByReporterId(UUID reporterId);
}
