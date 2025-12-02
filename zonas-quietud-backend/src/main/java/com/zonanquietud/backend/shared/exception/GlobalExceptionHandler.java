package com.zonanquietud.backend.shared.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.zonanquietud.backend.shared.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;

/**
 * GlobalExceptionHandler - Manejo centralizado de excepciones genéricas
 * Shared infrastructure - maneja solo excepciones genéricas, no específicas de
 * features
 * 
 * Nota: Cada feature debe tener su propio ExceptionHandler para sus excepciones
 * específicas
 * Ejemplo: AuthExceptionHandler en features/auth/infrastructure/exception/
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  /**
   * Maneja IllegalArgumentException
   */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(
      IllegalArgumentException ex,
      WebRequest request) {
    log.warn("Argumento ilegal: {}", ex.getMessage());

    ApiResponse<Void> response = ApiResponse.error(
        HttpStatus.BAD_REQUEST,
        ex.getMessage(),
        extractPath(request));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  /**
   * Maneja IllegalStateException
   */
  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<ApiResponse<Void>> handleIllegalStateException(
      IllegalStateException ex,
      WebRequest request) {
    log.error("Estado ilegal: {}", ex.getMessage(), ex);

    ApiResponse<Void> response = ApiResponse.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Ocurrió un error inesperado",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }

  /**
   * Maneja NullPointerException
   */
  @ExceptionHandler(NullPointerException.class)
  public ResponseEntity<ApiResponse<Void>> handleNullPointerException(
      NullPointerException ex,
      WebRequest request) {
    log.error("NullPointerException: {}", ex.getMessage(), ex);

    ApiResponse<Void> response = ApiResponse.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Ocurrió un error interno. Por favor, contacte al administrador.",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }

  @ExceptionHandler(org.springframework.web.servlet.resource.NoResourceFoundException.class)
  public ResponseEntity<ApiResponse<Void>> handleNoResourceFoundException(
      org.springframework.web.servlet.resource.NoResourceFoundException ex,
      WebRequest request) {
    ApiResponse<Void> response = ApiResponse.error(
        HttpStatus.NOT_FOUND,
        "Recurso no encontrado",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  /**
   * Maneja todas las demás excepciones no capturadas
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Void>> handleGlobalException(
      Exception ex,
      WebRequest request) {
    log.error("Error inesperado: {}", ex.getMessage(), ex);

    ApiResponse<Void> response = ApiResponse.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }

  /**
   * Extrae la ruta de la solicitud
   */
  private String extractPath(WebRequest request) {
    return request.getDescription(false).replace("uri=", "");
  }
}
