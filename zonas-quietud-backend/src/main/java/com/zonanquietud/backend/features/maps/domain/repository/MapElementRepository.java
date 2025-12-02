package com.zonanquietud.backend.features.maps.domain.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.locationtech.jts.geom.Polygon;

import com.zonanquietud.backend.features.maps.domain.model.MapElement;

/**
 * MapElementRepository - Repositorio de dominio para elementos del mapa
 * Capa de dominio - Define operaciones de persistencia
 * 
 * NOTA: Este repositorio NO proporciona un método findAll() para prevenir
 * escaneos completos de tabla. Todas las consultas DEBEN usar filtrado espacial vía viewport.
 */
public interface MapElementRepository {

  /**
   * Buscar todos los elementos que intersectan con el polígono de viewport dado
   * Usa consultas espaciales de PostGIS para filtrado eficiente
   * 
   * Este es el método de consulta PRINCIPAL - toda recuperación de elementos DEBE ser
   * filtrada espacialmente.
   * 
   * @param viewport Polígono que representa los límites del viewport del mapa
   * @return Lista de elementos dentro o intersectando el viewport
   */
  List<MapElement> findAllInViewport(Polygon viewport);

  /** Buscar elemento por ID */
  Optional<MapElement> findById(UUID id);

  /** Guardar un elemento del mapa */
  MapElement save(MapElement element);

  /** Guardar múltiples elementos (operación por lotes) */
  List<MapElement> saveAll(List<MapElement> elements);

  /** Contar total de elementos */
  long count();

  /** Eliminar todos los elementos (para pruebas/recarga) */
  void deleteAll();
}
