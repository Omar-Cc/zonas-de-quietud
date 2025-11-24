package com.zonanquietud.backend.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * JwtProperties - Configuration properties for JWT
 * Pure Java record (no external dependencies)
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
    String secret,
    long accessTokenExpiration,
    long refreshTokenExpiration) {
}
