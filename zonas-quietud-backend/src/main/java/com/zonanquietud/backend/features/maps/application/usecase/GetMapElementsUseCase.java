package com.zonanquietud.backend.features.maps.application.usecase;

import java.util.List;
import java.util.stream.Collectors;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.MultiLineString;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Polygon;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.maps.controller.dto.MapElementResponse;
import com.zonanquietud.backend.features.maps.controller.dto.ViewportRequest;
import com.zonanquietud.backend.features.maps.domain.model.MapElement;
import com.zonanquietud.backend.features.maps.domain.repository.MapElementRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * GetMapElementsUseCase - Retrieve map elements with REQUIRED viewport
 * filtering
 * Application layer - Business logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GetMapElementsUseCase {

  private final MapElementRepository repository;
  private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

  // Safety limit: Maximum viewport span in degrees (~55km at equator per 0.5
  // degrees)
  // Prevents queries covering entire countries/continents
  private static final double MAX_VIEWPORT_LAT_SPAN = 0.5;

  /**
   * Get map elements filtered by viewport (REQUIRED)
   * 
   * @param viewport Required viewport bounds for spatial filtering
   * @return List of map elements within the viewport
   * @throws IllegalArgumentException if viewport is invalid or too large
   */
  public List<MapElementResponse> execute(ViewportRequest viewport) {
    // Validate viewport forms a valid bounding box
    if (!viewport.isValid()) {
      throw new IllegalArgumentException(
          "Invalid viewport: minLat must be < maxLat and minLng must be < maxLng");
    }

    // Safety check: prevent overly large viewport queries
    double latSpan = viewport.getLatSpan();
    if (latSpan > MAX_VIEWPORT_LAT_SPAN) {
      log.warn("Viewport too large: latSpan={} exceeds max={}", latSpan, MAX_VIEWPORT_LAT_SPAN);
      throw new IllegalArgumentException(
          String.format("Viewport too large: latitude span %.2f exceeds maximum %.2f degrees",
              latSpan, MAX_VIEWPORT_LAT_SPAN));
    }

    log.debug("Fetching elements in viewport: minLat={}, minLng={}, maxLat={}, maxLng={}",
        viewport.minLat(), viewport.minLng(), viewport.maxLat(), viewport.maxLng());

    Polygon viewportPolygon = createViewportPolygon(viewport);
    List<MapElement> elements = repository.findAllInViewport(viewportPolygon);

    log.info("Found {} elements in viewport", elements.size());

    return elements.stream()
        .map(this::toResponse)
        .collect(Collectors.toList());
  }

  /**
   * Create a polygon from viewport bounds
   */
  private Polygon createViewportPolygon(ViewportRequest viewport) {
    // Create rectangle polygon from bounds
    // Note: JTS uses (x, y) = (lng, lat) order
    Coordinate[] coords = new Coordinate[5];
    coords[0] = new Coordinate(viewport.minLng(), viewport.minLat());
    coords[1] = new Coordinate(viewport.maxLng(), viewport.minLat());
    coords[2] = new Coordinate(viewport.maxLng(), viewport.maxLat());
    coords[3] = new Coordinate(viewport.minLng(), viewport.maxLat());
    coords[4] = new Coordinate(viewport.minLng(), viewport.minLat()); // Close the ring

    return geometryFactory.createPolygon(coords);
  }

  /**
   * Convert domain model to response DTO
   * IMPORTANT: Converts JTS coordinates (lng, lat) to frontend format [lat, lng]
   */
  private MapElementResponse toResponse(MapElement element) {
    List<List<Double>> coordinates = extractCoordinates(element.getGeometry());

    return new MapElementResponse(
        element.getId(),
        element.getName(),
        element.getType(),
        element.getScore(),
        coordinates);
  }

  /**
   * Extract coordinates from geometry
   * Converts from JTS (lng, lat) to frontend [lat, lng] format
   */
  private List<List<Double>> extractCoordinates(Geometry geometry) {
    
    if (geometry instanceof LineString) {
      return extractLineStringCoordinates((LineString) geometry);
    } else if (geometry instanceof MultiLineString) {
      return extractMultiLineStringCoordinates((MultiLineString) geometry);
    } else if (geometry instanceof Polygon) {
      return extractPolygonCoordinates((Polygon) geometry);
    } else if (geometry instanceof MultiPolygon) {
      return extractMultiPolygonCoordinates((MultiPolygon) geometry);
    }

    log.warn("Unsupported geometry type: {}", geometry.getGeometryType());
    return List.of();
  }

  private List<List<Double>> extractLineStringCoordinates(LineString lineString) {
    return java.util.Arrays.stream(lineString.getCoordinates())
        .map(coord -> List.of(coord.y, coord.x)) // [lat, lng] for frontend
        .collect(Collectors.toList());
  }

  private List<List<Double>> extractMultiLineStringCoordinates(MultiLineString multiLineString) {
    // For MultiLineString, we'll flatten all coordinates
    // Frontend can handle this as a single path or split by detecting gaps
    List<List<Double>> allCoords = new java.util.ArrayList<>();
    for (int i = 0; i < multiLineString.getNumGeometries(); i++) {
      LineString line = (LineString) multiLineString.getGeometryN(i);
      allCoords.addAll(extractLineStringCoordinates(line));
    }
    return allCoords;
  }

  private List<List<Double>> extractPolygonCoordinates(Polygon polygon) {
    // Return exterior ring coordinates
    return extractLineStringCoordinates(polygon.getExteriorRing());
  }

  private List<List<Double>> extractMultiPolygonCoordinates(MultiPolygon multiPolygon) {
    // For MultiPolygon, return coordinates of the first (largest) polygon
    // Frontend can request individual polygons if needed
    if (multiPolygon.getNumGeometries() > 0) {
      Polygon firstPolygon = (Polygon) multiPolygon.getGeometryN(0);
      return extractPolygonCoordinates(firstPolygon);
    }
    return List.of();
  }
}
