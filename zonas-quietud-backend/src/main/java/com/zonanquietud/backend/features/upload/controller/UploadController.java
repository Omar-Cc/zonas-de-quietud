package com.zonanquietud.backend.features.upload.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zonanquietud.backend.features.upload.application.service.ImageStorageService;
import com.zonanquietud.backend.features.upload.controller.dto.UploadImageRequest;
import com.zonanquietud.backend.features.upload.controller.dto.UploadImageResponse;
import com.zonanquietud.backend.shared.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * UploadController - REST API for file uploads
 * Controller layer - HTTP endpoints
 */
@RestController
@RequestMapping("/api/v1/upload")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Upload", description = "File upload endpoints")
public class UploadController {

  private final ImageStorageService imageStorageService;

  /**
   * Upload image from base64 data
   * Returns public URL to use in ratings/incidents
   */
  @PostMapping("/image")
  @Operation(summary = "Upload image", description = "Upload an image from base64 data. Returns a public URL to use in ratings or incident reports. Max size: 5MB.")
  public ResponseEntity<ApiResponse<UploadImageResponse>> uploadImage(
      @Valid @RequestBody UploadImageRequest request) {
    log.info("POST /api/v1/upload/image - mimeType: {}", request.mimeType());

    try {
      // Extract base64 data (remove data URI prefix if present)
      String base64Data = request.extractBase64Data();

      // Validate image size
      imageStorageService.validateImageSize(base64Data);

      // Save image and get URL
      String fileExtension = request.getFileExtension();
      String url = imageStorageService.saveImage(base64Data, fileExtension);

      // Get file size
      long size = imageStorageService.getFileSize(base64Data);

      // Extract filename from URL
      String filename = url.substring(url.lastIndexOf('/') + 1);

      UploadImageResponse response = new UploadImageResponse(url, filename, size);

      return ResponseEntity
          .status(HttpStatus.CREATED)
          .body(ApiResponse.exito(response, "Image uploaded successfully"));

    } catch (IllegalArgumentException e) {
      log.error("Invalid image data: {}", e.getMessage());
      return ResponseEntity
          .badRequest()
          .body(ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage(), "/api/v1/upload/image"));
    } catch (Exception e) {
      log.error("Failed to upload image", e);
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
              "Failed to upload image",
              "/api/v1/upload/image"));
    }
  }
}
