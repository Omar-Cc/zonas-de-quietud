package com.zonanquietud.backend.features.auth.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * JwtProperties - Configuration properties for JWT
 * Moved to feature package to avoid module violations
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
    String privateKeyPath,
    String publicKeyPath,
    long accessTokenExpiration,
    long refreshTokenExpiration) {
}
