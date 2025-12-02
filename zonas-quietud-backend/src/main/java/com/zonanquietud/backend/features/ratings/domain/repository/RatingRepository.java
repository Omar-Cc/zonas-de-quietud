package com.zonanquietud.backend.features.ratings.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.zonanquietud.backend.features.ratings.domain.model.Rating;

/** RatingRepository - Repositorio de dominio para calificaciones */
public interface RatingRepository {

  /** Guardar una calificación */
  Rating save(Rating rating);

  /** Buscar calificación por ID */
  Optional<Rating> findById(UUID id);

  /** Buscar todas las calificaciones de un elemento del mapa */
  List<Rating> findByMapElementId(UUID mapElementId);

  /** Buscar todas las calificaciones de un usuario */
  List<Rating> findByUserId(UUID userId);

  /** Calcular puntaje promedio general para un elemento del mapa */
  Double calculateAverageScore(UUID mapElementId);

  /** Contar total de calificaciones */
  long count();
}
