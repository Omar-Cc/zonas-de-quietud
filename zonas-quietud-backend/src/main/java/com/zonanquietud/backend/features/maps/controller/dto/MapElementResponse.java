package com.zonanquietud.backend.features.maps.controller.dto;

import java.util.List;
import java.util.UUID;

import com.zonanquietud.backend.features.maps.domain.model.ElementType;

/**
 * MapElementResponse - DTO for map element API responses
 * Controller layer - Simplified representation for frontend
 * 
 * Coordinates are in [lat, lng] format for Leaflet compatibility
 * Note: JTS uses [lng, lat] (x, y) internally, so we reverse the order
 */
public record MapElementResponse(
    UUID id,
    String name,
    ElementType type,
    Double score,
    List<List<Double>> coordinates // [[lat, lng], [lat, lng], ...] for frontend
) {
}
