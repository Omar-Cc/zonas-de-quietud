package com.zonanquietud.backend.features.maps.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.maps.domain.model.MapElement;
import com.zonanquietud.backend.features.maps.domain.repository.MapElementRepository;
import com.zonanquietud.backend.features.maps.infrastructure.mapper.MapElementMapper;
import com.zonanquietud.backend.features.maps.infrastructure.persistence.repository.MapElementJpaRepository;

import lombok.RequiredArgsConstructor;

/**
 * MapElementRepositoryImpl - Implementación del repositorio de dominio
 * Capa de infraestructura - Adaptador entre dominio y JPA
 */
@Repository
@RequiredArgsConstructor
public class MapElementRepositoryImpl implements MapElementRepository {

  private final MapElementJpaRepository jpaRepository;
  private final MapElementMapper mapper;

  @Override
  public List<MapElement> findAllInViewport(Polygon viewport) {
    return jpaRepository.findAllInViewport(viewport).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public Optional<MapElement> findById(UUID id) {
    return jpaRepository.findById(id)
        .map(mapper::toDomain);
  }

  @Override
  public MapElement save(MapElement element) {
    element.validate();

    var entity = mapper.toEntity(element);
    var savedEntity = jpaRepository.save(entity);
    return mapper.toDomain(savedEntity);
  }

  @Override
  public List<MapElement> saveAll(List<MapElement> elements) {
    elements.forEach(MapElement::validate);

    var entities = elements.stream()
        .map(mapper::toEntity)
        .collect(Collectors.toList());

    var savedEntities = jpaRepository.saveAll(entities);

    return savedEntities.stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public long count() {
    return jpaRepository.count();
  }

  @Override
  public void deleteAll() {
    jpaRepository.deleteAll();
  }
}
