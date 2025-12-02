package com.zonanquietud.backend.features.maps.controller.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * ViewportRequest - DTO para filtrado de viewport obligatorio
 * Capa de controlador - Parámetros requeridos para consultas espaciales
 * 
 * Todos los parámetros son REQUERIDOS para prevenir consultas completas a la base de datos.
 * Define una caja delimitadora para filtrado de viewport del mapa.
 */
public record ViewportRequest(
    @NotNull(message = "minLat is required") @Min(value = -90, message = "Minimum latitude must be >= -90") @Max(value = 90, message = "Minimum latitude must be <= 90") Double minLat,

    @NotNull(message = "minLng is required") @Min(value = -180, message = "Minimum longitude must be >= -180") @Max(value = 180, message = "Minimum longitude must be <= 180") Double minLng,

    @NotNull(message = "maxLat is required") @Min(value = -90, message = "Maximum latitude must be >= -90") @Max(value = 90, message = "Maximum latitude must be <= 90") Double maxLat,

    @NotNull(message = "maxLng is required") @Min(value = -180, message = "Maximum longitude must be >= -180") @Max(value = 180, message = "Maximum longitude must be <= 180") Double maxLng) {
  /**
   * Validar que el viewport forma una caja delimitadora válida
   * 
   * @return true si el viewport es válido
   */
  public boolean isValid() {
    return minLat < maxLat && minLng < maxLng;
  }

  /**
   * Calcular el área del viewport en grados cuadrados
   * Usado para verificaciones de seguridad para prevenir consultas demasiado grandes
   */
  public double getArea() {
    return (maxLat - minLat) * (maxLng - minLng);
  }

  /** Obtener el rango latitudinal del viewport */
  public double getLatSpan() {
    return maxLat - minLat;
  }

  /** Obtener el rango longitudinal del viewport */
  public double getLngSpan() {
    return maxLng - minLng;
  }
}
