package com.zonanquietud.backend.infrastructure.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/** PropertiesConfig - Habilita propiedades de configuración */
@Configuration
@EnableConfigurationProperties({
    JwtProperties.class
})
public class PropertiesConfig {
}
