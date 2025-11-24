package com.zonanquietud.backend.infrastructure.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * PropertiesConfig - Enables configuration properties
 */
@Configuration
@EnableConfigurationProperties({
    JwtProperties.class
})
public class PropertiesConfig {
}
