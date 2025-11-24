package com.zonanquietud.backend.features.upload.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * UploadImageRequest - DTO for image upload
 * Accepts base64 encoded image data
 */
public record UploadImageRequest(
    @NotBlank(message = "Image data is required") String imageData,

    @Pattern(regexp = "image/(jpeg|jpg|png|webp)", message = "Only JPEG, PNG, and WebP images are supported") String mimeType) {
  /**
   * Extract base64 data without data URI prefix
   */
  public String extractBase64Data() {
    if (imageData.contains(",")) {
      return imageData.split(",")[1];
    }
    return imageData;
  }

  /**
   * Determine file extension from mime type
   */
  public String getFileExtension() {
    if (mimeType == null) {
      return "jpg"; // default
    }
    return switch (mimeType) {
      case "image/jpeg", "image/jpg" -> "jpg";
      case "image/png" -> "png";
      case "image/webp" -> "webp";
      default -> "jpg";
    };
  }
}
