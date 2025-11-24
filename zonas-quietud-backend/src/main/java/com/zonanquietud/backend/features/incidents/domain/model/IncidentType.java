package com.zonanquietud.backend.features.incidents.domain.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * IncidentType - Types of incidents that can be reported
 * Domain layer - Aligned with frontend values
 */
public enum IncidentType {
  @JsonProperty("ROBBERY")
  ROBBERY,

  @JsonProperty("VANDALISM")
  VANDALISM,

  @JsonProperty("SUSPICIOUS")
  SUSPICIOUS,

  @JsonProperty("ACCIDENT")
  ACCIDENT,

  @JsonProperty("NOISE")
  NOISE,

  @JsonProperty("INFRASTRUCTURE")
  INFRASTRUCTURE,

  @JsonProperty("LIGHTING")
  LIGHTING,

  @JsonProperty("POLLUTION")
  POLLUTION,

  @JsonProperty("OTHER")
  OTHER
}
