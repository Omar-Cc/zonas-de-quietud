package com.zonanquietud.backend.features.upload.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * UploadImageRequest - DTO para subida de imagen
 * Acepta datos de imagen codificados en base64
 */
public record UploadImageRequest(
    @NotBlank(message = "Image data is required") String imageData,

    @Pattern(regexp = "image/(jpeg|jpg|png|webp)", message = "Only JPEG, PNG, and WebP images are supported") String mimeType) {
  /** Extraer datos base64 sin prefijo data URI */
  public String extractBase64Data() {
    if (imageData.contains(",")) {
      return imageData.split(",")[1];
    }
    return imageData;
  }

  /** Determinar extensión de archivo desde tipo MIME */
  public String getFileExtension() {
    if (mimeType == null) {
      return "jpg";
    }
    return switch (mimeType) {
      case "image/jpeg", "image/jpg" -> "jpg";
      case "image/png" -> "png";
      case "image/webp" -> "webp";
      default -> "jpg";
    };
  }
}
