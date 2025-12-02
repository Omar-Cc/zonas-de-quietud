package com.zonanquietud.backend.features.maps.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.maps.domain.model.MapElement;
import com.zonanquietud.backend.features.maps.infrastructure.persistence.jpa.MapElementJpaEntity;

/**
 * MapElementMapper - Mapeador bidireccional entre dominio y entidades JPA
 * Capa de infraestructura - Maneja conversión entre capas
 */
@Component
public class MapElementMapper {

  /** Convertir entidad JPA a modelo de dominio */
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

  /** Convertir modelo de dominio a entidad JPA */
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
   * Actualizar entidad existente con datos del modelo de dominio
   * Preserva ID y timestamps
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
