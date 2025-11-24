package com.zonanquietud.backend.features.ratings.application.usecase;

import java.time.Instant;
import java.util.UUID;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.zonanquietud.backend.features.ratings.application.event.StreetRatedEvent;
import com.zonanquietud.backend.features.ratings.controller.dto.DetailedRatings;
import com.zonanquietud.backend.features.ratings.controller.dto.LocationDto;
import com.zonanquietud.backend.features.ratings.controller.dto.RateStreetRequest;
import com.zonanquietud.backend.features.ratings.controller.dto.RatingResponse;
import com.zonanquietud.backend.features.ratings.domain.model.Rating;
import com.zonanquietud.backend.features.ratings.domain.repository.RatingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * RateStreetUseCase - Submit a rating for a street/zone
 * Application layer - Business logic
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RateStreetUseCase {

  private final RatingRepository repository;
  private final ApplicationEventPublisher eventPublisher;
  private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

  /**
   * Execute rating submission
   */
  public RatingResponse execute(RateStreetRequest request) {
    log.info("Submitting rating for element {} by user {}",
        request.streetId(), request.userId());

    // Convert lat/lng to PostGIS Point
    Point location = geometryFactory.createPoint(
        new Coordinate(request.location().longitude(),
            request.location().latitude()));

    // Create domain model
    Rating rating = Rating.builder()
        .id(UUID.randomUUID())
        .userId(request.userId())
        .mapElementId(request.streetId())
        .overallScore(request.overallScore())
        .comments(request.comments())
        .ratingType(request.ratingType())
        .security(request.detailedRatings().security())
        .airQuality(request.detailedRatings().airQuality())
        .noise(request.detailedRatings().noise())
        .accessibility(request.detailedRatings().accessibility())
        .tranquility(request.detailedRatings().tranquility())
        .photos(request.photos())
        .location(location)
        .build();

    // Save rating
    Rating saved = repository.save(rating);

    // Calculate new average score for the map element
    Double newAverage = repository.calculateAverageScore(request.streetId());

    log.info("Rating saved with ID {}. New average score: {}", saved.getId(), newAverage);

    // Publish event to update map
    eventPublisher.publishEvent(new StreetRatedEvent(
        saved.getId(),
        request.streetId(),
        newAverage,
        Instant.now()));

    return toResponse(saved);
  }

  /**
   * Convert domain model to response DTO
   */
  private RatingResponse toResponse(Rating rating) {
    // Convert Point back to lat/lng
    LocationDto location = new LocationDto(
        rating.getLocation().getY(), // latitude
        rating.getLocation().getX() // longitude
    );

    DetailedRatings detailedRatings = new DetailedRatings(
        rating.getSecurity(),
        rating.getAirQuality(),
        rating.getNoise(),
        rating.getAccessibility(),
        rating.getTranquility());

    return new RatingResponse(
        rating.getId(),
        rating.getUserId(),
        rating.getMapElementId(),
        rating.getOverallScore(),
        rating.getComments(),
        rating.getRatingType(),
        detailedRatings,
        rating.getPhotos(),
        location,
        rating.getCreatedAt());
  }
}
