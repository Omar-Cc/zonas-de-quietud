package com.zonanquietud.backend.features.auth.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * JwtProperties - Propiedades de configuración para JWT
 * Movido al paquete de feature para evitar violaciones de módulo
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
    String privateKeyPath,
    String publicKeyPath,
    long accessTokenExpiration,
    long refreshTokenExpiration) {
}
