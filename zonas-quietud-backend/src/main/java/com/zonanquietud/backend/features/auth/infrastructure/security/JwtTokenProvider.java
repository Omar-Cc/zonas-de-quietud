package com.zonanquietud.backend.features.auth.infrastructure.security;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.zonanquietud.backend.features.auth.domain.exception.InvalidTokenException;
import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.infrastructure.config.JwtProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * JwtTokenProvider - Handles JWT token generation and validation using RSA keys
 * Infrastructure layer - can use external libraries (JJWT)
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

  private final JwtProperties jwtProperties;

  private PrivateKey privateKey;
  private PublicKey publicKey;

  @PostConstruct
  public void init() {
    try {
      log.info("Initializing JWT token provider with RSA keys");
      this.privateKey = loadPrivateKey(jwtProperties.privateKeyPath());
      this.publicKey = loadPublicKey(jwtProperties.publicKeyPath());
      log.info("JWT token provider initialized successfully");
    } catch (Exception e) {
      log.error("Failed to initialize JWT token provider", e);
      throw new IllegalStateException("Could not initialize JWT keys", e);
    }
  }

  /**
   * Generates an access token for the given user
   */
  public String generateAccessToken(Usuario usuario) {
    try {
      log.debug("Generating access token for user: {}", usuario.getId());

      Instant now = Instant.now();
      Instant expiration = now.plus(jwtProperties.accessTokenExpiration(), ChronoUnit.MILLIS);

      String token = Jwts.builder()
          .subject(usuario.getId().toString())
          .claim("email", usuario.getEmail().getValue())
          .claim("firebaseUid", usuario.getFirebaseUid())
          .claim("type", "access")
          .issuedAt(Date.from(now))
          .expiration(Date.from(expiration))
          .signWith(privateKey, Jwts.SIG.RS256)
          .compact();

      log.debug("Access token generated successfully for user: {}", usuario.getId());
      return token;

    } catch (Exception e) {
      log.error("Error generating access token for user: {}", usuario.getId(), e);
      throw new RuntimeException("Failed to generate access token", e);
    }
  }

  /**
   * Generates a refresh token for the given user
   */
  public String generateRefreshToken(Usuario usuario) {
    try {
      log.debug("Generating refresh token for user: {}", usuario.getId());

      Instant now = Instant.now();
      Instant expiration = now.plus(jwtProperties.refreshTokenExpiration(), ChronoUnit.MILLIS);

      String token = Jwts.builder()
          .subject(usuario.getId().toString())
          .claim("type", "refresh")
          .issuedAt(Date.from(now))
          .expiration(Date.from(expiration))
          .signWith(privateKey, Jwts.SIG.RS256)
          .compact();

      log.debug("Refresh token generated successfully for user: {}", usuario.getId());
      return token;

    } catch (Exception e) {
      log.error("Error generating refresh token for user: {}", usuario.getId(), e);
      throw new RuntimeException("Failed to generate refresh token", e);
    }
  }

  /**
   * Validates a JWT token
   */
  public boolean validateToken(String token) {
    try {
      log.trace("Validating JWT token");

      Jwts.parser()
          .verifyWith(publicKey)
          .build()
          .parseSignedClaims(token);

      log.trace("JWT token validated successfully");
      return true;

    } catch (SignatureException ex) {
      log.warn("Invalid JWT signature");
      throw InvalidTokenException.invalid();
    } catch (MalformedJwtException ex) {
      log.warn("Invalid JWT token format");
      throw InvalidTokenException.malformed();
    } catch (ExpiredJwtException ex) {
      log.warn("Expired JWT token");
      throw InvalidTokenException.expired();
    } catch (UnsupportedJwtException ex) {
      log.warn("Unsupported JWT token");
      throw InvalidTokenException.invalid();
    } catch (IllegalArgumentException ex) {
      log.warn("JWT claims string is empty");
      throw InvalidTokenException.invalid();
    } catch (Exception ex) {
      log.error("Unexpected error validating JWT token", ex);
      throw InvalidTokenException.invalid();
    }
  }

  /**
   * Extracts user ID from JWT token
   */
  public UUID getUserIdFromToken(String token) {
    try {
      log.trace("Extracting user ID from token");

      Claims claims = Jwts.parser()
          .verifyWith(publicKey)
          .build()
          .parseSignedClaims(token)
          .getPayload();

      UUID userId = UUID.fromString(claims.getSubject());
      log.trace("Extracted user ID: {}", userId);
      return userId;

    } catch (Exception e) {
      log.error("Error extracting user ID from token", e);
      throw InvalidTokenException.invalid();
    }
  }

  /**
   * Extracts expiration date from JWT token
   */
  public Date getExpirationFromToken(String token) {
    try {
      log.trace("Extracting expiration from token");

      Claims claims = Jwts.parser()
          .verifyWith(publicKey)
          .build()
          .parseSignedClaims(token)
          .getPayload();

      return claims.getExpiration();

    } catch (Exception e) {
      log.error("Error extracting expiration from token", e);
      throw InvalidTokenException.invalid();
    }
  }

  /**
   * Checks if token is expired
   */
  public boolean isTokenExpired(String token) {
    try {
      Date expiration = getExpirationFromToken(token);
      return expiration.before(new Date());
    } catch (Exception e) {
      log.warn("Error checking token expiration", e);
      return true;
    }
  }

  /**
   * Loads private key from file
   */
  private PrivateKey loadPrivateKey(String path) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
    try {
      log.debug("Loading private key from: {}", path);

      byte[] keyBytes = Files.readAllBytes(Paths.get(path));
      String privateKeyPEM = new String(keyBytes)
          .replace("-----BEGIN PRIVATE KEY-----", "")
          .replace("-----END PRIVATE KEY-----", "")
          .replaceAll("\\s", "");

      byte[] decoded = Base64.getDecoder().decode(privateKeyPEM);
      PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);
      KeyFactory keyFactory = KeyFactory.getInstance("RSA");

      log.debug("Private key loaded successfully");
      return keyFactory.generatePrivate(keySpec);

    } catch (IOException e) {
      log.error("Failed to read private key file: {}", path, e);
      throw e;
    } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
      log.error("Failed to parse private key", e);
      throw e;
    }
  }

  /**
   * Loads public key from file
   */
  private PublicKey loadPublicKey(String path) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
    try {
      log.debug("Loading public key from: {}", path);

      byte[] keyBytes = Files.readAllBytes(Paths.get(path));
      String publicKeyPEM = new String(keyBytes)
          .replace("-----BEGIN PUBLIC KEY-----", "")
          .replace("-----END PUBLIC KEY-----", "")
          .replaceAll("\\s", "");

      byte[] decoded = Base64.getDecoder().decode(publicKeyPEM);
      X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decoded);
      KeyFactory keyFactory = KeyFactory.getInstance("RSA");

      log.debug("Public key loaded successfully");
      return keyFactory.generatePublic(keySpec);

    } catch (IOException e) {
      log.error("Failed to read public key file: {}", path, e);
      throw e;
    } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
      log.error("Failed to parse public key", e);
      throw e;
    }
  }
}
