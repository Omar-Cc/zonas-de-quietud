package com.zonanquietud.backend.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * JwtProperties - Propiedades de configuración para JWT
 * Record puro de Java (sin dependencias externas)
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
    String secret,
    long accessTokenExpiration,
    long refreshTokenExpiration) {
}
