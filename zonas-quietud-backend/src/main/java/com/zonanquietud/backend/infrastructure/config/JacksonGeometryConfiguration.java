package com.zonanquietud.backend.infrastructure.config;

import org.n52.jackson.datatype.jts.JtsModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * JacksonGeometryConfiguration - Configure Jackson for JTS geometry
 * serialization
 * Infrastructure layer - Global configuration
 * 
 * Registers JtsModule to handle org.locationtech.jts.geom.Geometry
 * serialization/deserialization
 * and JavaTimeModule for Java 8 date/time types
 */
@Configuration
public class JacksonGeometryConfiguration {

  /**
   * Register JTS module for geometry handling
   * This allows Jackson to serialize/deserialize JTS geometries to/from GeoJSON
   */
  @Bean
  public JtsModule jtsModule() {
    return new JtsModule();
  }

  /**
   * Configure ObjectMapper with JTS and JavaTime support
   * This is automatically picked up by Spring Boot
   */
  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule(new JtsModule());
    mapper.registerModule(new JavaTimeModule());
    return mapper;
  }
}
