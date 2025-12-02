package com.zonanquietud.backend.features.incidents.domain.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * IncidentType - Tipos de incidentes que pueden ser reportados
 * Capa de dominio - Alineado con valores del frontend
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
