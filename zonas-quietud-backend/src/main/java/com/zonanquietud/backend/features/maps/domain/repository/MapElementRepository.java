package com.zonanquietud.backend.features.maps.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.locationtech.jts.geom.Polygon;

import com.zonanquietud.backend.features.maps.domain.model.MapElement;

/**
 * MapElementRepository - Domain repository for map elements
 * Domain layer - Defines persistence operations
 * 
 * NOTE: This repository does NOT provide a findAll() method to prevent
 * full table scans. All queries MUST use spatial filtering via viewport.
 */
public interface MapElementRepository {

  /**
   * Find all elements that intersect with the given viewport polygon
   * Uses PostGIS spatial queries for efficient filtering
   * 
   * This is the PRIMARY query method - all element retrieval MUST be spatially
   * filtered.
   * 
   * @param viewport Polygon representing the map viewport bounds
   * @return List of elements within or intersecting the viewport
   */
  List<MapElement> findAllInViewport(Polygon viewport);

  /**
   * Find element by ID
   */
  Optional<MapElement> findById(UUID id);

  /**
   * Save a map element
   */
  MapElement save(MapElement element);

  /**
   * Save multiple elements (batch operation)
   */
  List<MapElement> saveAll(List<MapElement> elements);

  /**
   * Count total elements
   */
  long count();

  /**
   * Delete all elements (for testing/reloading)
   */
  void deleteAll();
}
