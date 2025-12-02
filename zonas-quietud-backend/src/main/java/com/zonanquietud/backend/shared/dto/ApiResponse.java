package com.zonanquietud.backend.shared.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * ApiResponse - Respuesta API genérica y consistente para todos los features
 * Combina lo mejor de ambos enfoques: inmutabilidad de records + trazabilidad
 * completa
 * 
 * Características:
 * - Trazabilidad con traceId único
 * - Soporte completo para paginación
 * - Errores detallados con códigos
 * - Metadatos de request (path, method, status)
 * - Retry logic para errores temporales
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
    String traceId,
    Instant timestamp,
    Integer status,
    String mensaje,
    String descripcion,
    T datos,
    String codigoError,
    List<ErrorDetalle> errores,
    MetadatosPaginacion paginacion,
    String ruta,
    String metodo,
    Long reintentoEnSegundos) {

  /** Respuesta exitosa con datos simples */
  public static <T> ApiResponse<T> exito(T datos, String mensaje) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        HttpStatus.OK.value(),
        mensaje,
        null,
        datos,
        null,
        null,
        null,
        null,
        null,
        null);
  }

  /**
   * Respuesta exitosa sin datos
   */
  public static <T> ApiResponse<T> exito(String mensaje) {
    return exito(null, mensaje);
  }

  /**
   * Respuesta exitosa con lista paginada
   */
  public static <T> ApiResponse<T> exitoPaginado(
      T datos,
      String mensaje,
      MetadatosPaginacion paginacion) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        HttpStatus.OK.value(),
        mensaje,
        null,
        datos,
        null,
        null,
        paginacion,
        null,
        null,
        null);
  }

  /**
   * Respuesta de creación exitosa (201)
   */
  public static <T> ApiResponse<T> creado(T datos, String mensaje) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        HttpStatus.CREATED.value(),
        mensaje,
        null,
        datos,
        null,
        null,
        null,
        null,
        null,
        null);
  }

  /** Respuesta de error simple */
  public static <T> ApiResponse<T> error(
      HttpStatus status,
      String mensaje,
      String ruta) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        status.value(),
        mensaje,
        null,
        null,
        null,
        null,
        null,
        ruta,
        null,
        null);
  }

  /**
   * Respuesta de error con descripción detallada
   */
  public static <T> ApiResponse<T> errorDetallado(
      HttpStatus status,
      String mensaje,
      String descripcion,
      String ruta,
      String metodo) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        status.value(),
        mensaje,
        descripcion,
        null,
        null,
        null,
        null,
        ruta,
        metodo,
        null);
  }

  /**
   * Respuesta de error con código personalizado
   */
  public static <T> ApiResponse<T> errorConCodigo(
      HttpStatus status,
      String mensaje,
      String codigoError,
      String ruta) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        status.value(),
        mensaje,
        null,
        null,
        codigoError,
        null,
        null,
        ruta,
        null,
        null);
  }

  /**
   * Respuesta de error con detalles de validación
   */
  public static <T> ApiResponse<T> errorValidacion(
      String mensaje,
      List<ErrorDetalle> errores,
      String ruta) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        HttpStatus.BAD_REQUEST.value(),
        mensaje,
        null,
        null,
        "VALIDATION_ERROR",
        errores,
        null,
        ruta,
        null,
        null);
  }

  /**
   * Respuesta de error con retry (para errores temporales)
   */
  public static <T> ApiResponse<T> errorConReintento(
      HttpStatus status,
      String mensaje,
      Long reintentoEnSegundos,
      String ruta) {
    return new ApiResponse<>(
        UUID.randomUUID().toString(),
        Instant.now(),
        status.value(),
        mensaje,
        "Este error es temporal. Por favor, reintente la operación.",
        null,
        "TEMPORARY_ERROR",
        null,
        null,
        ruta,
        null,
        reintentoEnSegundos);
  }

  public record MetadatosPaginacion(
      long paginaActual,
      long elementosPorPagina,
      long totalElementos,
      long totalPaginas,
      boolean tieneSiguiente,
      boolean tieneAnterior) {
    /**
     * Factory method para crear metadatos desde Spring Data Page
     */
    public static MetadatosPaginacion of(
        int paginaActual,
        int elementosPorPagina,
        long totalElementos) {
      long totalPaginas = (long) Math.ceil((double) totalElementos / elementosPorPagina);
      return new MetadatosPaginacion(
          paginaActual,
          elementosPorPagina,
          totalElementos,
          totalPaginas,
          paginaActual < totalPaginas - 1,
          paginaActual > 0);
    }
  }

  /**
   * Detalle de error individual (para validaciones)
   */
  public record ErrorDetalle(
      String codigo,
      String campo,
      String mensaje,
      Object valorRechazado) {
    /**
     * Error de validación simple
     */
    public static ErrorDetalle of(String campo, String mensaje) {
      return new ErrorDetalle(null, campo, mensaje, null);
    }

    /**
     * Error de validación con valor rechazado
     */
    public static ErrorDetalle of(String campo, String mensaje, Object valorRechazado) {
      return new ErrorDetalle(null, campo, mensaje, valorRechazado);
    }

    /**
     * Error con código personalizado
     */
    public static ErrorDetalle conCodigo(String codigo, String campo, String mensaje) {
      return new ErrorDetalle(codigo, campo, mensaje, null);
    }
  }
}
