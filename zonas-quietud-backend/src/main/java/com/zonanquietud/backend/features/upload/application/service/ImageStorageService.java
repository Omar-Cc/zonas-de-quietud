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
 * ImageStorageService - Maneja el almacenamiento de imágenes en el sistema de
 * archivos local
 * Capa de aplicación - Lógica de negocio para subida de imágenes
 */
@Service
@Slf4j
public class ImageStorageService {

  @Value("${app.upload.dir:uploads/images}")
  private String uploadDir;

  @Value("${app.upload.base-url}")
  private String baseUrl;

  /**
   * Guardar imagen base64 en el sistema de archivos local
   * 
   * @param base64Data    Datos de imagen codificados en Base64
   * @param fileExtension Extensión del archivo (jpg, png, webp)
   * @return URL pública de la imagen guardada
   */
  public String saveImage(String base64Data, String fileExtension) {
    try {

      Path uploadPath = Paths.get(uploadDir);
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
        log.info("Created upload directory: {}", uploadPath.toAbsolutePath());
      }

      String filename = UUID.randomUUID().toString() + "." + fileExtension;
      Path filePath = uploadPath.resolve(filename);

      byte[] imageBytes = Base64.getDecoder().decode(base64Data);
      Files.write(filePath, imageBytes, StandardOpenOption.CREATE_NEW);

      log.info("Image saved: {} ({} bytes)", filename, imageBytes.length);

      return baseUrl + "/" + filename;

    } catch (IOException e) {
      log.error("Failed to save image", e);
      throw new RuntimeException("Failed to save image: " + e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error("Invalid base64 data", e);
      throw new RuntimeException("Invalid image data: " + e.getMessage());
    }
  }

  /** Obtener tamaño del archivo desde datos base64 */
  public long getFileSize(String base64Data) {
    try {
      byte[] imageBytes = Base64.getDecoder().decode(base64Data);
      return imageBytes.length;
    } catch (IllegalArgumentException e) {
      return 0;
    }
  }

  /** Validar tamaño de imagen (máximo 5MB) */
  public void validateImageSize(String base64Data) {
    long size = getFileSize(base64Data);
    long maxSize = 5L * 1024 * 1024;

    if (size > maxSize) {
      throw new IllegalArgumentException(
          String.format("Image too large: %d bytes (max: %d bytes)", size, maxSize));
    }
  }
}
