package com.zonanquietud.backend.features.maps.infrastructure.loader;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.MultiLineString;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Polygon;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zonanquietud.backend.features.maps.domain.model.ElementType;
import com.zonanquietud.backend.features.maps.domain.model.MapElement;
import com.zonanquietud.backend.features.maps.domain.repository.MapElementRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * GeoJsonLoaderService - Loads GeoJSON data into database on startup
 * Infrastructure layer - Data initialization
 * 
 * Reads urban-elements.geojson and populates map_elements table if empty
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GeoJsonLoaderService implements CommandLineRunner {

  private final MapElementRepository repository;
  private final ObjectMapper objectMapper;

  private static final String GEOJSON_FILE_PATH = "data/urban-elements.geojson";

  @Override
  public void run(String... args) {
    try {
      // Only load if database is empty (idempotent)
      if (repository.count() > 0) {
        log.info("Map elements already loaded. Skipping GeoJSON import.");
        return;
      }

      log.info("Loading GeoJSON data from: {}", GEOJSON_FILE_PATH);
      loadGeoJsonData();
      log.info("GeoJSON data loaded successfully. Total elements: {}", repository.count());

    } catch (Exception e) {
      log.warn("Failed to load GeoJSON data: {}. Application will continue without initial data.",
          e.getMessage());
      log.debug("GeoJSON loading error details:", e);
    }
  }

  private void loadGeoJsonData() throws IOException {
    ClassPathResource resource = new ClassPathResource(GEOJSON_FILE_PATH);

    if (!resource.exists()) {
      log.warn("GeoJSON file not found at: {}. Skipping data load.", GEOJSON_FILE_PATH);
      return;
    }

    try (InputStream inputStream = resource.getInputStream()) {
      JsonNode rootNode = objectMapper.readTree(inputStream);

      if (!"FeatureCollection".equals(rootNode.get("type").asText())) {
        throw new IllegalArgumentException("GeoJSON must be a FeatureCollection");
      }

      JsonNode features = rootNode.get("features");
      List<MapElement> elements = new ArrayList<>();

      for (JsonNode feature : features) {
        try {
          MapElement element = parseFeature(feature);
          if (element != null) {
            elements.add(element);
          }
        } catch (Exception e) {
          log.warn("Failed to parse feature: {}. Skipping.", e.getMessage());
        }
      }

      if (!elements.isEmpty()) {
        repository.saveAll(elements);
        log.info("Loaded {} map elements from GeoJSON", elements.size());
      }
    }
  }

  private MapElement parseFeature(JsonNode feature) throws IOException {
    // Extract properties
    JsonNode properties = feature.get("properties");
    String name = extractName(properties);

    if (name == null || name.isBlank()) {
      log.debug("Skipping feature without name");
      return null;
    }

    // Extract and parse geometry
    JsonNode geometryNode = feature.get("geometry");
    String geometryType = geometryNode.get("type").asText();

    Geometry geometry = parseGeometry(geometryNode);
    ElementType type = determineElementType(geometry, geometryType);

    return MapElement.create(name, type, geometry);
  }

  private String extractName(JsonNode properties) {
    if (properties == null) {
      return null;
    }

    // Try different name fields common in OSM/Overpass data
    if (properties.has("name")) {
      return properties.get("name").asText();
    }
    if (properties.has("Name")) {
      return properties.get("Name").asText();
    }
    if (properties.has("NAME")) {
      return properties.get("NAME").asText();
    }

    return null;
  }

  private Geometry parseGeometry(JsonNode geometryNode) throws IOException {
    // Use ObjectMapper to convert JsonNode to Geometry
    // This works because JtsModule is registered in JacksonGeometryConfiguration
    return objectMapper.treeToValue(geometryNode, Geometry.class);
  }

  private ElementType determineElementType(Geometry geometry, String geometryType) {
    // Handle LineString and MultiLineString as STREET
    if (geometry instanceof LineString || geometry instanceof MultiLineString) {
      return ElementType.STREET;
    }

    // Handle Polygon and MultiPolygon as ZONE
    if (geometry instanceof Polygon || geometry instanceof MultiPolygon) {
      return ElementType.ZONE;
    }

    // Default to ZONE for other geometry types (Point, etc.)
    log.warn("Unexpected geometry type: {}. Defaulting to ZONE.", geometryType);
    return ElementType.ZONE;
  }
}
