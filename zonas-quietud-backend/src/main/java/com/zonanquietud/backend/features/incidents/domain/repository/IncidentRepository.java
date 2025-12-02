package com.zonanquietud.backend.features.incidents.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.zonanquietud.backend.features.incidents.domain.model.Incident;

/**
 * IncidentRepository - Repositorio de dominio para incidentes
 * Capa de dominio
 */
public interface IncidentRepository {

  /** Guardar un incidente */
  Incident save(Incident incident);

  /** Buscar incidente por ID */
  Optional<Incident> findById(UUID id);

  /** Buscar todos los incidentes de un elemento del mapa */
  List<Incident> findByMapElementId(UUID mapElementId);

  /** Buscar todos los incidentes de un reportero */
  List<Incident> findByReporterId(UUID reporterId);

  /** Contar total de incidentes */
  long count();
}
