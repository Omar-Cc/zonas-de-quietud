package com.zonanquietud.backend.features.maps.application.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonanquietud.backend.features.incidents.application.event.IncidentReportedEvent;
import com.zonanquietud.backend.features.incidents.domain.model.IncidentSeverity;
import com.zonanquietud.backend.features.maps.domain.repository.MapElementRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * IncidentEventListener - Escucha eventos de incidentes y aplica penalizaciones a puntajes del mapa
 * Módulo de mapas - Manejador de eventos
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class IncidentEventListener {

  private final MapElementRepository repository;

  /**
   * Manejar evento de incidente reportado
   * Aplica una penalización al puntaje del elemento del mapa basado en la severidad
   */
  @EventListener
  @Transactional
  public void handleIncidentReported(IncidentReportedEvent event) {
    log.info("Handling IncidentReportedEvent for element: {} (severity: {})",
        event.mapElementId(), event.severity());

    repository.findById(event.mapElementId())
        .ifPresentOrElse(
            element -> {
              double penalty = calculatePenalty(event.severity());
              element.adjustScore(-penalty);
              repository.save(element);
              log.info("Applied penalty of {} to element {}. New score: {}",
                  penalty, event.mapElementId(), element.getScore());
            },
            () -> log.warn("MapElement not found: {}", event.mapElementId()));
  }

  /** Calcular penalización basada en la severidad del incidente */
  private double calculatePenalty(IncidentSeverity severity) {
    return switch (severity) {
      case LOW -> 0.5;
      case MEDIUM -> 1.0;
      case HIGH -> 2.0;
    };
  }
}
