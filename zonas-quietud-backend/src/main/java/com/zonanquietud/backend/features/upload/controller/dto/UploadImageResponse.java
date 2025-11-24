package com.zonanquietud.backend.features.upload.controller.dto;

/**
 * UploadImageResponse - DTO for image upload response
 * Returns the public URL of the uploaded image
 */
public record UploadImageResponse(
    String url,
    String filename,
    Long size) {
}
