package com.zonanquietud.backend.features.upload.application.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

/**
 * ImageStorageService - Handles image storage to local filesystem
 * Application layer - Business logic for image uploads
 */
@Service
@Slf4j
public class ImageStorageService {

  @Value("${app.upload.dir:uploads/images}")
  private String uploadDir;

  @Value("${app.upload.base-url:http://localhost:8080/uploads/images}")
  private String baseUrl;

  /**
   * Save base64 image to local filesystem
   * 
   * @param base64Data    Base64 encoded image data
   * @param fileExtension File extension (jpg, png, webp)
   * @return Public URL of the saved image
   */
  public String saveImage(String base64Data, String fileExtension) {
    try {
      // Ensure upload directory exists
      Path uploadPath = Paths.get(uploadDir);
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
        log.info("Created upload directory: {}", uploadPath.toAbsolutePath());
      }

      // Generate unique filename
      String filename = UUID.randomUUID().toString() + "." + fileExtension;
      Path filePath = uploadPath.resolve(filename);

      // Decode base64 and write to file
      byte[] imageBytes = Base64.getDecoder().decode(base64Data);
      Files.write(filePath, imageBytes, StandardOpenOption.CREATE_NEW);

      log.info("Image saved: {} ({} bytes)", filename, imageBytes.length);

      // Return public URL
      return baseUrl + "/" + filename;

    } catch (IOException e) {
      log.error("Failed to save image", e);
      throw new RuntimeException("Failed to save image: " + e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error("Invalid base64 data", e);
      throw new RuntimeException("Invalid image data: " + e.getMessage());
    }
  }

  /**
   * Get file size from base64 data
   */
  public long getFileSize(String base64Data) {
    try {
      byte[] imageBytes = Base64.getDecoder().decode(base64Data);
      return imageBytes.length;
    } catch (IllegalArgumentException e) {
      return 0;
    }
  }

  /**
   * Validate image size (max 5MB)
   */
  public void validateImageSize(String base64Data) {
    long size = getFileSize(base64Data);
    long maxSize = 5L * 1024 * 1024; // 5MB

    if (size > maxSize) {
      throw new IllegalArgumentException(
          String.format("Image too large: %d bytes (max: %d bytes)", size, maxSize));
    }
  }
}
