package com.zonanquietud.backend.features.maps.controller.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * ViewportRequest - DTO for mandatory viewport filtering
 * Controller layer - Required parameters for spatial queries
 * 
 * All parameters are REQUIRED to prevent full database queries.
 * Defines a bounding box for map viewport filtering.
 */
public record ViewportRequest(
    @NotNull(message = "minLat is required") @Min(value = -90, message = "Minimum latitude must be >= -90") @Max(value = 90, message = "Minimum latitude must be <= 90") Double minLat,

    @NotNull(message = "minLng is required") @Min(value = -180, message = "Minimum longitude must be >= -180") @Max(value = 180, message = "Minimum longitude must be <= 180") Double minLng,

    @NotNull(message = "maxLat is required") @Min(value = -90, message = "Maximum latitude must be >= -90") @Max(value = 90, message = "Maximum latitude must be <= 90") Double maxLat,

    @NotNull(message = "maxLng is required") @Min(value = -180, message = "Maximum longitude must be >= -180") @Max(value = 180, message = "Maximum longitude must be <= 180") Double maxLng) {
  /**
   * Validate that the viewport forms a valid bounding box
   * 
   * @return true if viewport is valid
   */
  public boolean isValid() {
    return minLat < maxLat && minLng < maxLng;
  }

  /**
   * Calculate the area of the viewport in degrees squared
   * Used for safety checks to prevent overly large queries
   */
  public double getArea() {
    return (maxLat - minLat) * (maxLng - minLng);
  }

  /**
   * Get the latitudinal span of the viewport
   */
  public double getLatSpan() {
    return maxLat - minLat;
  }

  /**
   * Get the longitudinal span of the viewport
   */
  public double getLngSpan() {
    return maxLng - minLng;
  }
}
