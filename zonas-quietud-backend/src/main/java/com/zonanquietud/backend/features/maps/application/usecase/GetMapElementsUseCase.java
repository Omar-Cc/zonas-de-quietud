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
 * GetMapElementsUseCase - Recuperar elementos del mapa con filtrado de viewport REQUERIDO
 * Capa de aplicación - Lógica de negocio
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GetMapElementsUseCase {

  private final MapElementRepository repository;
  private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

  // Límite de seguridad: Rango máximo de viewport en grados (~55km en el ecuador por 0.5 grados)
  // Previene consultas que cubran países/continentes enteros
  private static final double MAX_VIEWPORT_LAT_SPAN = 0.5;

  /**
   * Obtener elementos del mapa filtrados por viewport (REQUERIDO)
   * 
   * @param viewport Bounds de viewport requeridos para filtrado espacial
   * @return Lista de elementos del mapa dentro del viewport
   * @throws IllegalArgumentException si el viewport es inválido o demasiado grande
   */
  public List<MapElementResponse> execute(ViewportRequest viewport) {
    if (!viewport.isValid()) {
      throw new IllegalArgumentException(
          "Invalid viewport: minLat must be < maxLat and minLng must be < maxLng");
    }

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

  /** Crear un polígono desde los límites del viewport */
  private Polygon createViewportPolygon(ViewportRequest viewport) {
    Coordinate[] coords = new Coordinate[5];
    coords[0] = new Coordinate(viewport.minLng(), viewport.minLat());
    coords[1] = new Coordinate(viewport.maxLng(), viewport.minLat());
    coords[2] = new Coordinate(viewport.maxLng(), viewport.maxLat());
    coords[3] = new Coordinate(viewport.minLng(), viewport.maxLat());
    coords[4] = new Coordinate(viewport.minLng(), viewport.minLat());

    return geometryFactory.createPolygon(coords);
  }

  /**
   * Convertir modelo de dominio a DTO de respuesta
   * IMPORTANTE: Convierte coordenadas JTS (lng, lat) a formato frontend [lat, lng]
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
   * Extraer coordenadas de geometría
   * Convierte de JTS (lng, lat) a formato frontend [lat, lng]
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
        .map(coord -> List.of(coord.y, coord.x))
        .collect(Collectors.toList());
  }

  private List<List<Double>> extractMultiLineStringCoordinates(MultiLineString multiLineString) {
    List<List<Double>> allCoords = new java.util.ArrayList<>();
    for (int i = 0; i < multiLineString.getNumGeometries(); i++) {
      LineString line = (LineString) multiLineString.getGeometryN(i);
      allCoords.addAll(extractLineStringCoordinates(line));
    }
    return allCoords;
  }

  private List<List<Double>> extractPolygonCoordinates(Polygon polygon) {
    return extractLineStringCoordinates(polygon.getExteriorRing());
  }

  private List<List<Double>> extractMultiPolygonCoordinates(MultiPolygon multiPolygon) {
    if (multiPolygon.getNumGeometries() > 0) {
      Polygon firstPolygon = (Polygon) multiPolygon.getGeometryN(0);
      return extractPolygonCoordinates(firstPolygon);
    }
    return List.of();
  }
}
