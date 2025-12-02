package com.zonanquietud.backend.features.maps.application.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonanquietud.backend.features.maps.domain.repository.MapElementRepository;
import com.zonanquietud.backend.features.ratings.application.event.StreetRatedEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * RatingEventListener - Escucha eventos de calificación y actualiza puntajes del mapa
 * Módulo de mapas - Manejador de eventos
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RatingEventListener {

  private final MapElementRepository repository;

  /**
   * Manejar evento de calle calificada
   * Actualiza el puntaje del elemento del mapa con el nuevo promedio de calificación
   */
  @EventListener
  @Transactional
  public void handleStreetRated(StreetRatedEvent event) {
    log.info("Handling StreetRatedEvent for element: {}", event.mapElementId());

    repository.findById(event.mapElementId())
        .ifPresentOrElse(
            element -> {
              element.setScore(event.newAverageScore());
              repository.save(element);
              log.info("Updated score for element {} to {}",
                  event.mapElementId(), event.newAverageScore());
            },
            () -> log.warn("MapElement not found: {}", event.mapElementId()));
  }
}
