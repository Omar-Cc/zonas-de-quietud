package com.zonanquietud.backend.features.maps.controller.dto;

import java.util.List;
import java.util.UUID;

import com.zonanquietud.backend.features.maps.domain.model.ElementType;

/**
 * MapElementResponse - DTO para respuestas API de elementos del mapa
 * Capa de controlador - Representación simplificada para el frontend
 * 
 * Las coordenadas están en formato [lat, lng] para compatibilidad con Leaflet
 * Nota: JTS usa [lng, lat] (x, y) internamente, por lo que invertimos el orden
 */
public record MapElementResponse(
    UUID id,
    String name,
    ElementType type,
    Double score,
    List<List<Double>> coordinates
) {
}
