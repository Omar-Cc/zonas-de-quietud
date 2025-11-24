package com.zonanquietud.backend.features.maps.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zonanquietud.backend.features.maps.application.usecase.GetMapElementsUseCase;
import com.zonanquietud.backend.features.maps.controller.dto.MapElementResponse;
import com.zonanquietud.backend.features.maps.controller.dto.ViewportRequest;
import com.zonanquietud.backend.features.maps.domain.repository.MapElementRepository;
import com.zonanquietud.backend.shared.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * MapController - REST API for map elements
 * Controller layer - HTTP endpoints
 */
@RestController
@RequestMapping("/api/v1/maps")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Maps", description = "Map elements management endpoints")
public class MapController {

  private final GetMapElementsUseCase getMapElementsUseCase;
  private final MapElementRepository repository;

  /**
   * Get map elements filtered by viewport (REQUIRED)
   * 
   * All viewport parameters are REQUIRED to prevent full database queries.
   * This ensures efficient spatial filtering and prevents system overload.
   * 
   * @param minLat Minimum latitude (REQUIRED)
   * @param minLng Minimum longitude (REQUIRED)
   * @param maxLat Maximum latitude (REQUIRED)
   * @param maxLng Maximum longitude (REQUIRED)
   * @return List of map elements with coordinates in [lat, lng] format
   */
  @GetMapping("/elements")
  @Operation(summary = "Get map elements by viewport", description = "Retrieve map elements filtered by viewport bounds (ALL PARAMETERS REQUIRED). "
      +
      "Coordinates are returned in [lat, lng] format for Leaflet compatibility. " +
      "Maximum viewport span: 0.5 degrees latitude (~55km).")
  public ResponseEntity<ApiResponse<List<MapElementResponse>>> getElements(
      @Parameter(description = "Minimum latitude (REQUIRED)", required = true) @RequestParam(required = true) Double minLat,

      @Parameter(description = "Minimum longitude (REQUIRED)", required = true) @RequestParam(required = true) Double minLng,

      @Parameter(description = "Maximum latitude (REQUIRED)", required = true) @RequestParam(required = true) Double maxLat,

      @Parameter(description = "Maximum longitude (REQUIRED)", required = true) @RequestParam(required = true) Double maxLng) {
    log.info("GET /api/v1/maps/elements - minLat: {}, minLng: {}, maxLat: {}, maxLng: {}",
        minLat, minLng, maxLat, maxLng);

    ViewportRequest viewport = new ViewportRequest(minLat, minLng, maxLat, maxLng);
    List<MapElementResponse> elements = getMapElementsUseCase.execute(viewport);

    String message = String.format("Elementos en viewport obtenidos: %d", elements.size());
    return ResponseEntity.ok(ApiResponse.exito(elements, message));
  }

  /**
   * Get single map element by ID
   */
  @GetMapping("/elements/{id}")
  @Operation(summary = "Get map element by ID", description = "Retrieve a single map element by its UUID")
  public ResponseEntity<ApiResponse<MapElementResponse>> getElementById(
      @PathVariable UUID id) {
    log.info("GET /api/v1/maps/elements/{}", id);

    return repository.findById(id)
        .map(element -> {
          // Convert to response (simplified, should use use case)
          List<List<Double>> coords = List.of(); // TODO: Extract coordinates
          MapElementResponse response = new MapElementResponse(
              element.getId(),
              element.getName(),
              element.getType(),
              element.getScore(),
              coords);
          return ResponseEntity.ok(ApiResponse.exito(response, "Elemento encontrado"));
        })
        .orElse(ResponseEntity.notFound().build());
  }

  /**
   * Health check endpoint to verify data loading
   */
  @GetMapping("/health")
  @Operation(summary = "Map service health check", description = "Returns the count of loaded map elements")
  public ResponseEntity<ApiResponse<Long>> health() {
    long count = repository.count();
    String message = count > 0
        ? String.format("Servicio de mapas activo. Elementos cargados: %d", count)
        : "Servicio de mapas activo. Sin elementos cargados.";

    return ResponseEntity.ok(ApiResponse.exito(count, message));
  }
}
