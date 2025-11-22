package com.zonanquietud.backend.features.auth.controller.dto;

import java.time.LocalDate;

import com.zonanquietud.backend.features.auth.domain.enums.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

public record RegisterRequest(
    @NotBlank(message = "Firebase token es requerido") String firebaseToken,

    @NotBlank(message = "Nombre es requerido") String firstName,

    @NotBlank(message = "Apellido es requerido") String lastName,

    String phone,

    @Past(message = "Fecha de nacimiento debe ser en el pasado") LocalDate birthDate,

    Gender gender) {
}
