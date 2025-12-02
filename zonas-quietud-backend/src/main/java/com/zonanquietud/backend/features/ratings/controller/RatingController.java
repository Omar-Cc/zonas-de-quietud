package com.zonanquietud.backend.features.ratings.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zonanquietud.backend.features.ratings.application.usecase.RateStreetUseCase;
import com.zonanquietud.backend.features.ratings.controller.dto.RateStreetRequest;
import com.zonanquietud.backend.features.ratings.controller.dto.RatingResponse;
import com.zonanquietud.backend.shared.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/** RatingController - API REST para calificaciones */
@RestController
@RequestMapping("/api/v1/ratings")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Ratings", description = "Street and zone rating endpoints")
public class RatingController {

  private final RateStreetUseCase rateStreetUseCase;

  /** Enviar una calificación para una calle o zona */
  @PostMapping
  @Operation(summary = "Submit rating", description = "Submit a rating for a street or zone with detailed scores and optional photos")
  public ResponseEntity<ApiResponse<RatingResponse>> rateStreet(
      @Valid @RequestBody RateStreetRequest request) {
    log.info("POST /api/v1/ratings - streetId: {}, userId: {}",
        request.streetId(), request.userId());

    RatingResponse response = rateStreetUseCase.execute(request);

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.exito(response, "Rating submitted successfully"));
  }
}
