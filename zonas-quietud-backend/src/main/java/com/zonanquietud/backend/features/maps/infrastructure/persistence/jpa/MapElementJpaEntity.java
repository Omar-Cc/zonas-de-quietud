package com.zonanquietud.backend.features.maps.infrastructure.persistence.jpa;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.locationtech.jts.geom.Geometry;

import com.zonanquietud.backend.features.maps.domain.model.ElementType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * MapElementJpaEntity - JPA entity for map elements
 * Infrastructure layer - Persistence model with Hibernate Spatial
 * 
 * Uses PostGIS geometry column with SRID 4326 (WGS 84)
 */
@Entity
@Table(name = "map_elements")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapElementJpaEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 50)
  private ElementType type;

  @Column(nullable = false)
  private Double score;

  /**
   * Geometry column using PostGIS
   * SRID 4326 = WGS 84 (standard for GPS coordinates)
   * 
   * Supports: LineString, MultiLineString, Polygon, MultiPolygon
   */
  @Column(columnDefinition = "geometry(Geometry, 4326)", nullable = false)
  private Geometry geometry;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;
}
