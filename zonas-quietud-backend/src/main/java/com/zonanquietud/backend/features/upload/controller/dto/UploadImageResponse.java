package com.zonanquietud.backend.features.upload.controller.dto;

/**
 * UploadImageResponse - DTO para respuesta de carga de imagen
 * Retorna la URL pública de la imagen cargada
 */
public record UploadImageResponse(
    String url,
    String filename,
    Long size) {
}
