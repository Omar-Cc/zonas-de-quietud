package com.zonanquietud.backend.features.auth.infrastructure.exception;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.zonanquietud.backend.features.auth.domain.exception.EmailAlreadyInUseException;
import com.zonanquietud.backend.features.auth.domain.exception.InvalidCredentialsException;
import com.zonanquietud.backend.features.auth.domain.exception.InvalidTokenException;
import com.zonanquietud.backend.features.auth.domain.exception.UserAlreadyExistsException;
import com.zonanquietud.backend.features.auth.domain.exception.UserNotFoundException;
import com.zonanquietud.backend.shared.dto.ApiResponse;
import com.zonanquietud.backend.shared.dto.ApiResponse.ErrorDetalle;

import lombok.extern.slf4j.Slf4j;

/**
 * AuthExceptionHandler - Manejo de excepciones específicas del feature Auth
 * Feature infrastructure - maneja solo excepciones de autenticación
 */
@RestControllerAdvice(basePackages = "com.zonanquietud.backend.features.auth")
@Order(Ordered.HIGHEST_PRECEDENCE) // Procesar antes que GlobalExceptionHandler
@Slf4j
public class AuthExceptionHandler {

  /**
   * Maneja UserNotFoundException
   */
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ApiResponse<Void>> handleUserNotFoundException(
      UserNotFoundException ex,
      WebRequest request) {
    log.warn("Usuario no encontrado: {}", ex.getMessage());

    ApiResponse<Void> response = ApiResponse.errorConCodigo(
        HttpStatus.NOT_FOUND,
        ex.getMessage(),
        "USER_NOT_FOUND",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  /**
   * Maneja UserAlreadyExistsException
   */
  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<ApiResponse<Void>> handleUserAlreadyExistsException(
      UserAlreadyExistsException ex,
      WebRequest request) {
    log.warn("El usuario ya existe: {}", ex.getMessage());

    ApiResponse<Void> response = ApiResponse.errorConCodigo(
        HttpStatus.CONFLICT,
        ex.getMessage(),
        "USER_ALREADY_EXISTS",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
  }

  /**
   * Maneja EmailAlreadyInUseException
   */
  @ExceptionHandler(EmailAlreadyInUseException.class)
  public ResponseEntity<ApiResponse<Void>> handleEmailAlreadyInUseException(
      EmailAlreadyInUseException ex,
      WebRequest request) {
    log.warn("El correo electrónico ya está en uso: {}", ex.getMessage());

    ApiResponse<Void> response = ApiResponse.errorConCodigo(
        HttpStatus.BAD_REQUEST,
        ex.getMessage(),
        "EMAIL_ALREADY_IN_USE",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  /**
   * Maneja InvalidCredentialsException
   */
  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<ApiResponse<Void>> handleInvalidCredentialsException(
      InvalidCredentialsException ex,
      WebRequest request) {
    log.warn("Credenciales inválidas: {}", ex.getMessage());

    ApiResponse<Void> response = ApiResponse.errorConCodigo(
        HttpStatus.UNAUTHORIZED,
        ex.getMessage(),
        "INVALID_CREDENTIALS",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }

  /**
   * Maneja InvalidTokenException
   */
  @ExceptionHandler(InvalidTokenException.class)
  public ResponseEntity<ApiResponse<Void>> handleInvalidTokenException(
      InvalidTokenException ex,
      WebRequest request) {
    log.warn("Token inválido: {}", ex.getMessage());

    ApiResponse<Void> response = ApiResponse.errorConCodigo(
        HttpStatus.UNAUTHORIZED,
        ex.getMessage(),
        "INVALID_TOKEN",
        extractPath(request));

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }

  /**
   * Maneja errores de validación de @Valid en controllers de Auth
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(
      MethodArgumentNotValidException ex,
      WebRequest request) {
    log.warn("Error de validación en Auth: {}", ex.getMessage());

    List<ErrorDetalle> errores = new ArrayList<>();
    ex.getBindingResult().getAllErrors().forEach(error -> {
      String nombreCampo = ((FieldError) error).getField();
      String mensajeError = error.getDefaultMessage();
      Object valorRechazado = ((FieldError) error).getRejectedValue();
      errores.add(ErrorDetalle.of(nombreCampo, mensajeError, valorRechazado));
    });

    ApiResponse<Void> response = ApiResponse.errorValidacion(
        "Parámetros de solicitud inválidos",
        errores,
        extractPath(request));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  /**
   * Extrae la ruta de la solicitud
   */
  private String extractPath(WebRequest request) {
    return request.getDescription(false).replace("uri=", "");
  }
}
