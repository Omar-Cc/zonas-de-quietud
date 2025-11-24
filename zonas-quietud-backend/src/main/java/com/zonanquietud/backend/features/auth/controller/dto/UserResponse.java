package com.zonanquietud.backend.features.auth.controller.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.enums.Gender;
import com.zonanquietud.backend.features.auth.domain.enums.Membership;

public record UserResponse(
    UUID id,
    String email,
    String firebaseUid,
    String firstName,
    String lastName,
    String avatarUrl,
    String phone,
    LocalDate birthDate,
    Gender gender,
    Membership membership,
    boolean isVerified,
    boolean isActive,
    LocalDateTime createdAt,
    LocalDateTime lastLoginAt,
    int loginCount) {
}
