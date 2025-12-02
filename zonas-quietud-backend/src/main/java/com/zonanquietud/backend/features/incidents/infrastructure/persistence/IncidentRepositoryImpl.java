package com.zonanquietud.backend.features.incidents.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.incidents.domain.model.Incident;
import com.zonanquietud.backend.features.incidents.domain.repository.IncidentRepository;
import com.zonanquietud.backend.features.incidents.infrastructure.mapper.IncidentMapper;
import com.zonanquietud.backend.features.incidents.infrastructure.persistence.repository.IncidentJpaRepository;

import lombok.RequiredArgsConstructor;

/**
 * IncidentRepositoryImpl - Implementación del repositorio de dominio
 * Capa de infraestructura - Adaptador entre dominio y JPA
 */
@Repository
@RequiredArgsConstructor
public class IncidentRepositoryImpl implements IncidentRepository {

  private final IncidentJpaRepository jpaRepository;
  private final IncidentMapper mapper;

  @Override
  public Incident save(Incident incident) {
    incident.validate();

    var entity = mapper.toEntity(incident);
    var savedEntity = jpaRepository.save(entity);
    return mapper.toDomain(savedEntity);
  }

  @Override
  public Optional<Incident> findById(UUID id) {
    return jpaRepository.findById(id)
        .map(mapper::toDomain);
  }

  @Override
  public List<Incident> findByMapElementId(UUID mapElementId) {
    return jpaRepository.findByMapElementId(mapElementId).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public List<Incident> findByReporterId(UUID reporterId) {
    return jpaRepository.findByReporterId(reporterId).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public long count() {
    return jpaRepository.count();
  }
}
