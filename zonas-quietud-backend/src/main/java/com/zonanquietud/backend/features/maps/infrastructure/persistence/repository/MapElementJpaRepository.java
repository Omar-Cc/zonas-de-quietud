package com.zonanquietud.backend.features.maps.infrastructure.persistence.repository;

import java.util.List;
import java.util.UUID;

import org.locationtech.jts.geom.Polygon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zonanquietud.backend.features.maps.infrastructure.persistence.jpa.MapElementJpaEntity;

/**
 * MapElementJpaRepository - Repositorio Spring Data JPA
 * Capa de infraestructura - Consultas espaciales usando funciones PostGIS
 */
public interface MapElementJpaRepository extends JpaRepository<MapElementJpaEntity, UUID> {

  /**
   * Buscar todos los elementos que intersectan con el polígono de viewport dado
   * Usa función ST_Intersects de PostGIS para consulta espacial
   * 
   * @param viewport Polígono que representa los límites del viewport del mapa
   * @return Lista de elementos dentro o intersectando el viewport
   */
  @Query(value = "SELECT m FROM MapElementJpaEntity m WHERE ST_Intersects(m.geometry, :viewport) = true")
  List<MapElementJpaEntity> findAllInViewport(@Param("viewport") Polygon viewport);

  /**
   * Consulta nativa alternativa para mejor rendimiento con grandes conjuntos de datos
   * Usa índice espacial automáticamente
   */
  @Query(value = "SELECT * FROM map_elements WHERE ST_Intersects(geometry, :viewport)", nativeQuery = true)
  List<MapElementJpaEntity> findAllInViewportNative(@Param("viewport") Polygon viewport);
}
