package com.zonanquietud.backend.infrastructure.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * CorsConfig - CORS configuration
 * Infrastructure layer - configures Cross-Origin Resource Sharing
 */
@Configuration
public class CorsConfig {

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    // Allow specific origins (configure based on your frontend URL)
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000",
        "http://localhost:4200",
        "http://localhost:5173" // Vite default port
    ));

    // Allow specific HTTP methods
    configuration.setAllowedMethods(Arrays.asList(
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"));

    // Allow specific headers
    configuration.setAllowedHeaders(Arrays.asList(
        "Authorization",
        "Content-Type",
        "Accept",
        "X-Requested-With"));

    // Allow credentials (cookies, authorization headers)
    configuration.setAllowCredentials(true);

    // How long the response from a pre-flight request can be cached
    configuration.setMaxAge(3600L);

    // Expose headers to the client
    configuration.setExposedHeaders(Arrays.asList(
        "Authorization"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}
