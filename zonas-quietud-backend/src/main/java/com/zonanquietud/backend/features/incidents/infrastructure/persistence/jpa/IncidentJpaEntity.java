package com.zonanquietud.backend.features.incidents.infrastructure.persistence.jpa;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.locationtech.jts.geom.Point;

import com.zonanquietud.backend.features.incidents.domain.model.IncidentSeverity;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentStatus;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentType;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentUrgency;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * IncidentJpaEntity - Entidad JPA para incidentes con soporte PostGIS
 * Capa de infraestructura
 */
@Entity
@Table(name = "incidents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentJpaEntity {

  @Id
  private UUID id;

  @Column(name = "reporter_id", nullable = false)
  private UUID reporterId;

  @Column(name = "map_element_id", nullable = false)
  private UUID mapElementId;

  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  private IncidentType type;

  @Enumerated(EnumType.STRING)
  @Column(name = "severity", nullable = false)
  private IncidentSeverity severity;

  @Enumerated(EnumType.STRING)
  @Column(name = "urgency", nullable = false)
  private IncidentUrgency urgency;

  @Column(name = "description", columnDefinition = "TEXT", nullable = false)
  private String description;

  @Column(name = "is_anonymous")
  private Boolean isAnonymous;

  @Column(name = "notify_authorities")
  private Boolean notifyAuthorities;

  @ElementCollection
  @CollectionTable(name = "incident_photos", joinColumns = @JoinColumn(name = "incident_id"))
  @Column(name = "photo_url")
  private List<String> evidencePhotos;

  @Column(name = "location", columnDefinition = "GEOMETRY(Point, 4326)", nullable = false)
  private Point location;

  @Column(name = "location_accuracy")
  private Double locationAccuracy;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private IncidentStatus status;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;
}
