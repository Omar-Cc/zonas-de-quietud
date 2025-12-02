package com.zonanquietud.backend.features.ratings.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.zonanquietud.backend.features.ratings.domain.model.Rating;
import com.zonanquietud.backend.features.ratings.domain.repository.RatingRepository;
import com.zonanquietud.backend.features.ratings.infrastructure.mapper.RatingMapper;
import com.zonanquietud.backend.features.ratings.infrastructure.persistence.repository.RatingJpaRepository;

import lombok.RequiredArgsConstructor;

/**
 * RatingRepositoryImpl - Implementación del repositorio de dominio
 * Capa de infraestructura - Adaptador entre dominio y JPA
 */
@Repository
@RequiredArgsConstructor
public class RatingRepositoryImpl implements RatingRepository {

  private final RatingJpaRepository jpaRepository;
  private final RatingMapper mapper;

  @Override
  public Rating save(Rating rating) {
    rating.validate();

    var entity = mapper.toEntity(rating);
    var savedEntity = jpaRepository.save(entity);
    return mapper.toDomain(savedEntity);
  }

  @Override
  public Optional<Rating> findById(UUID id) {
    return jpaRepository.findById(id)
        .map(mapper::toDomain);
  }

  @Override
  public List<Rating> findByMapElementId(UUID mapElementId) {
    return jpaRepository.findByMapElementId(mapElementId).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public List<Rating> findByUserId(UUID userId) {
    return jpaRepository.findByUserId(userId).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public Double calculateAverageScore(UUID mapElementId) {
    Double average = jpaRepository.calculateAverageScore(mapElementId);
    return average != null ? average : 5.0;
  }

  @Override
  public long count() {
    return jpaRepository.count();
  }
}
