package com.zonanquietud.backend.features.ratings.infrastructure.mapper;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.ratings.domain.model.Rating;
import com.zonanquietud.backend.features.ratings.infrastructure.persistence.jpa.RatingJpaEntity;

/** RatingMapper - Mapeador bidireccional entre dominio y entidades JPA */
@Component
public class RatingMapper {

  /** Convertir modelo de dominio a entidad JPA */
  public RatingJpaEntity toEntity(Rating rating) {
    if (rating == null) {
      return null;
    }

    return RatingJpaEntity.builder()
        .id(rating.getId())
        .userId(rating.getUserId())
        .mapElementId(rating.getMapElementId())
        .overallScore(rating.getOverallScore())
        .comments(rating.getComments())
        .ratingType(rating.getRatingType())
        .security(rating.getSecurity())
        .airQuality(rating.getAirQuality())
        .noise(rating.getNoise())
        .accessibility(rating.getAccessibility())
        .tranquility(rating.getTranquility())
        .photos(rating.getPhotos())
        .location(rating.getLocation())
        .createdAt(rating.getCreatedAt())
        .updatedAt(rating.getUpdatedAt())
        .build();
  }

  /** Convertir entidad JPA a modelo de dominio */
  public Rating toDomain(RatingJpaEntity entity) {
    if (entity == null) {
      return null;
    }

    return Rating.builder()
        .id(entity.getId())
        .userId(entity.getUserId())
        .mapElementId(entity.getMapElementId())
        .overallScore(entity.getOverallScore())
        .comments(entity.getComments())
        .ratingType(entity.getRatingType())
        .security(entity.getSecurity())
        .airQuality(entity.getAirQuality())
        .noise(entity.getNoise())
        .accessibility(entity.getAccessibility())
        .tranquility(entity.getTranquility())
        .photos(entity.getPhotos())
        .location(entity.getLocation())
        .createdAt(entity.getCreatedAt())
        .updatedAt(entity.getUpdatedAt())
        .build();
  }
}
