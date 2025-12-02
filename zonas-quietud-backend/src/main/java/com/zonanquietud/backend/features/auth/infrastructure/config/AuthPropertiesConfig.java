package com.zonanquietud.backend.features.auth.infrastructure.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * AuthPropertiesConfig - Habilita propiedades de configuración para el feature
 * de autenticación
 */
@Configuration
@EnableConfigurationProperties({
        JwtProperties.class
})
public class AuthPropertiesConfig {
}
