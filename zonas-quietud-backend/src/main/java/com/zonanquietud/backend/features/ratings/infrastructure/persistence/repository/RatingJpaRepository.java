package com.zonanquietud.backend.features.ratings.infrastructure.persistence.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zonanquietud.backend.features.ratings.infrastructure.persistence.jpa.RatingJpaEntity;

/** RatingJpaRepository - Repositorio Spring Data JPA para calificaciones */
public interface RatingJpaRepository extends JpaRepository<RatingJpaEntity, UUID> {

  /** Buscar todas las calificaciones de un elemento del mapa específico */
  List<RatingJpaEntity> findByMapElementId(UUID mapElementId);

  /** Buscar todas las calificaciones de un usuario específico */
  List<RatingJpaEntity> findByUserId(UUID userId);

  /** Calcular puntaje promedio general para un elemento del mapa */
  @Query("SELECT AVG(r.overallScore) FROM RatingJpaEntity r WHERE r.mapElementId = :mapElementId")
  Double calculateAverageScore(@Param("mapElementId") UUID mapElementId);
}
