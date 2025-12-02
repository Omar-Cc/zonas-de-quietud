package com.zonanquietud.backend.infrastructure.config;

import org.n52.jackson.datatype.jts.JtsModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * JacksonGeometryConfiguration - Configurar Jackson para serialización de geometría JTS
 * Capa de infraestructura - Configuración global
 * 
 * Registra JtsModule para manejar serialización/deserialización de org.locationtech.jts.geom.Geometry
 * y JavaTimeModule para tipos de fecha/hora de Java 8
 */
@Configuration
public class JacksonGeometryConfiguration {

  /**
   * Registrar módulo JTS para manejo de geometría
   * Esto permite a Jackson serializar/deserializar geometrías JTS hacia/desde GeoJSON
   */
  @Bean
  public JtsModule jtsModule() {
    return new JtsModule();
  }

  /**
   * Configurar ObjectMapper con soporte JTS y JavaTime
   * Esto es automáticamente detectado por Spring Boot
   */
  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule(new JtsModule());
    mapper.registerModule(new JavaTimeModule());
    return mapper;
  }
}
