package com.zonanquietud.backend.features.maps.infrastructure.persistence.repository;

import java.util.List;
import java.util.UUID;

import org.locationtech.jts.geom.Polygon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zonanquietud.backend.features.maps.infrastructure.persistence.jpa.MapElementJpaEntity;

/**
 * MapElementJpaRepository - Spring Data JPA repository
 * Infrastructure layer - Spatial queries using PostGIS functions
 */
public interface MapElementJpaRepository extends JpaRepository<MapElementJpaEntity, UUID> {

  /**
   * Find all elements that intersect with the given viewport polygon
   * Uses PostGIS ST_Intersects function for spatial query
   * 
   * @param viewport Polygon representing the map viewport bounds
   * @return List of elements within or intersecting the viewport
   */
  @Query(value = "SELECT m FROM MapElementJpaEntity m WHERE ST_Intersects(m.geometry, :viewport) = true")
  List<MapElementJpaEntity> findAllInViewport(@Param("viewport") Polygon viewport);

  /**
   * Alternative native query for better performance with large datasets
   * Uses spatial index automatically
   */
  @Query(value = "SELECT * FROM map_elements WHERE ST_Intersects(geometry, :viewport)", nativeQuery = true)
  List<MapElementJpaEntity> findAllInViewportNative(@Param("viewport") Polygon viewport);
}
