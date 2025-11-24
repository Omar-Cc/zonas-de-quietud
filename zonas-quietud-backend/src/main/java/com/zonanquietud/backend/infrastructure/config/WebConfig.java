package com.zonanquietud.backend.infrastructure.config;

import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig - Configuration for serving static files
 * Infrastructure layer
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Value("${app.upload.dir:uploads/images}")
  private String uploadDir;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Serve uploaded images as static resources
    String uploadPath = Paths.get(uploadDir).toAbsolutePath().toUri().toString();

    registry.addResourceHandler("/uploads/images/**")
        .addResourceLocations(uploadPath);
  }
}
