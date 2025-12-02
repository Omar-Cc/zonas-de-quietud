package com.zonanquietud.backend.infrastructure.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

@Configuration
@Slf4j
public class FirebaseConfig {

  @Value("${firebase.config-base64:}")
  private String base64Config;

  @Bean
  public FirebaseApp firebaseApp() throws IOException {
    if (!FirebaseApp.getApps().isEmpty()) {
      return FirebaseApp.getInstance();
    }

    InputStream serviceAccount;

    if (base64Config != null && !base64Config.isEmpty()) {
      try {
        byte[] decodedBytes = Base64.getDecoder().decode(base64Config);
        serviceAccount = new ByteArrayInputStream(decodedBytes);
        log.info("✅ Firebase configurado desde application.yml (Base64)");
      } catch (IllegalArgumentException e) {
        log.error("❌ Error al decodificar firebase.config-base64: " + e.getMessage());
        throw e;
      }
    } else {
      serviceAccount = new FileInputStream("serviceAccountKey.json");
      log.info("✅ Firebase configurado desde Archivo Local (serviceAccountKey.json)");
    }

    FirebaseOptions options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();

    if (FirebaseApp.getApps().isEmpty()) {
      return FirebaseApp.initializeApp(options);
    } else {
      return FirebaseApp.getInstance();
    }
  }

  @Bean
  public FirebaseAuth firebaseAuth() throws IOException {
    firebaseApp();
    return FirebaseAuth.getInstance();
  }
}
