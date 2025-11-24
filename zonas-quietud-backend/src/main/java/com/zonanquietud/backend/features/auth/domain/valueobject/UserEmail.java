package com.zonanquietud.backend.features.auth.domain.valueobject;

import java.util.Objects;
import java.util.regex.Pattern;

public class UserEmail {

  // 1. Regla de validación (Regex simple para email)
  private static final String EMAIL_PATTERN = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
  private static final Pattern PATTERN = Pattern.compile(EMAIL_PATTERN);

  // 2. El dato real
  private final String value;

  // 3. Constructor privado o protegido para forzar validación
  // o constructor público con validación (Guard Clause)
  public UserEmail(String value) {
    if (value == null || value.trim().isEmpty()) {
      throw new IllegalArgumentException("El email no puede estar vacío");
    }

    if (!PATTERN.matcher(value).matches()) {
      throw new IllegalArgumentException("El formato del email no es válido: " + value);
    }

    this.value = value;
  }

  // 4. Getter (solo lectura)
  public String getValue() {
    return value;
  }

  // 5. IMPORTANTE: Los Value Objects se comparan por su contenido, no por
  // referencia
  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserEmail userEmail = (UserEmail) o;
    return Objects.equals(value, userEmail.value);
  }

  @Override
  public int hashCode() {
    return Objects.hash(value);
  }

  @Override
  public String toString() {
    return value;
  }
}