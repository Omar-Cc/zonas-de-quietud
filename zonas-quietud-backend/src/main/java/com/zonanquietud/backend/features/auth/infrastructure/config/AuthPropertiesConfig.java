package com.zonanquietud.backend.features.auth.infrastructure.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * AuthPropertiesConfig - Enables configuration properties for auth feature
 */
@Configuration
@EnableConfigurationProperties({
    JwtProperties.class
})
public class AuthPropertiesConfig {
}
