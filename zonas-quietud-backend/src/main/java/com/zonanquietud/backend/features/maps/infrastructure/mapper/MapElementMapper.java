package com.zonanquietud.backend.features.maps.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.maps.domain.model.MapElement;
import com.zonanquietud.backend.features.maps.infrastructure.persistence.jpa.MapElementJpaEntity;

/**
 * MapElementMapper - Bidirectional mapper between domain and JPA entities
 * Infrastructure layer - Handles conversion between layers
 */
@Component
public class MapElementMapper {

  /**
   * Convert JPA entity to domain model
   */
  public MapElement toDomain(MapElementJpaEntity entity) {
    if (entity == null) {
      return null;
    }

    return MapElement.builder()
        .id(entity.getId())
        .name(entity.getName())
        .type(entity.getType())
        .score(entity.getScore())
        .geometry(entity.getGeometry())
        .build();
  }

  /**
   * Convert domain model to JPA entity
   */
  public MapElementJpaEntity toEntity(MapElement domain) {
    if (domain == null) {
      return null;
    }

    return MapElementJpaEntity.builder()
        .id(domain.getId())
        .name(domain.getName())
        .type(domain.getType())
        .score(domain.getScore())
        .geometry(domain.getGeometry())
        .build();
  }

  /**
   * Update existing entity with domain model data
   * Preserves ID and timestamps
   */
  public void updateEntity(MapElementJpaEntity entity, MapElement domain) {
    if (entity == null || domain == null) {
      return;
    }

    entity.setName(domain.getName());
    entity.setType(domain.getType());
    entity.setScore(domain.getScore());
    entity.setGeometry(domain.getGeometry());
  }
}
