package com.zonanquietud.backend.features.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zonanquietud.backend.features.auth.application.usecase.GetCurrentUserUseCase;
import com.zonanquietud.backend.features.auth.application.usecase.LoginUserUseCase;
import com.zonanquietud.backend.features.auth.application.usecase.LogoutUserUseCase;
import com.zonanquietud.backend.features.auth.application.usecase.RefreshTokenUseCase;
import com.zonanquietud.backend.features.auth.application.usecase.RegisterUserUseCase;
import com.zonanquietud.backend.features.auth.controller.dto.AuthResponse;
import com.zonanquietud.backend.features.auth.controller.dto.LoginRequest;
import com.zonanquietud.backend.features.auth.controller.dto.RefreshTokenRequest;
import com.zonanquietud.backend.features.auth.controller.dto.RegisterRequest;
import com.zonanquietud.backend.features.auth.controller.dto.TokenResponse;
import com.zonanquietud.backend.features.auth.controller.dto.UserResponse;
import com.zonanquietud.backend.shared.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * AuthController - REST endpoints for authentication
 * Controller layer - handles HTTP requests/responses
 * Todas las respuestas usan ApiResponse para consistencia
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
@Slf4j
@Tag(name = "Authentication", description = "Authentication management endpoints")
public class AuthController {

  private final LoginUserUseCase loginUserUseCase;
  private final RegisterUserUseCase registerUserUseCase;
  private final RefreshTokenUseCase refreshTokenUseCase;
  private final LogoutUserUseCase logoutUserUseCase;
  private final GetCurrentUserUseCase getCurrentUserUseCase;

  @PostMapping("/login")
  @Operation(summary = "User login", description = "Authenticate user with Firebase token and return user data with JWT tokens")
  @ApiResponses(value = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class, subTypes = {
          AuthResponse.class }))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request"),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials")
  })
  public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
    log.info("Solicitud de inicio de sesión recibida");
    AuthResponse authResponse = loginUserUseCase.execute(request);
    log.info("Inicio de sesión exitoso para usuario: {}", authResponse.user().email());

    return ResponseEntity.ok(
        ApiResponse.exito(authResponse, "Inicio de sesión exitoso"));
  }

  @PostMapping("/register")
  @Operation(summary = "User registration", description = "Register a new user with Firebase token")
  @ApiResponses(value = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request or email already in use"),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid Firebase token")
  })
  public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
    log.info("Solicitud de registro recibida");
    AuthResponse authResponse = registerUserUseCase.execute(request);
    log.info("Usuario registrado exitosamente: {}", authResponse.user().email());

    return ResponseEntity.status(HttpStatus.CREATED).body(
        ApiResponse.creado(authResponse, "Usuario registrado exitosamente"));
  }

  @PostMapping("/refresh")
  @Operation(summary = "Refresh access token", description = "Get a new access token using a valid refresh token")
  @ApiResponses(value = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Token refreshed successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request"),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid or expired refresh token")
  })
  public ResponseEntity<ApiResponse<TokenResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
    log.info("Solicitud de actualización de token recibida");
    TokenResponse tokens = refreshTokenUseCase.execute(request.refreshToken());
    log.info("Token actualizado exitosamente");

    return ResponseEntity.ok(
        ApiResponse.exito(tokens, "Token actualizado exitosamente"));
  }

  @PostMapping("/logout")
  @Operation(summary = "User logout", description = "Logout user and invalidate tokens", security = @SecurityRequirement(name = "bearer-jwt"))
  @ApiResponses(value = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Logout successful", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  public ResponseEntity<ApiResponse<Void>> logout(@RequestHeader("Authorization") String authHeader) {
    log.info("Solicitud de cierre de sesión recibida");
    String token = extractToken(authHeader);
    logoutUserUseCase.execute(token);
    log.info("Cierre de sesión exitoso");

    return ResponseEntity.ok(
        ApiResponse.exito("Sesión cerrada exitosamente"));
  }

  @GetMapping("/me")
  @Operation(summary = "Get current user", description = "Get the currently authenticated user's information", security = @SecurityRequirement(name = "bearer-jwt"))
  @ApiResponses(value = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "User information retrieved successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized"),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "User not found")
  })
  public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
    log.info("Solicitud de usuario actual recibida");
    String token = extractToken(authHeader);
    UserResponse user = getCurrentUserUseCase.execute(token);
    log.info("Usuario actual obtenido: {}", user.id());

    return ResponseEntity.ok(
        ApiResponse.exito(user, "Usuario obtenido exitosamente"));
  }

  /**
   * Extracts JWT token from Authorization header
   */
  private String extractToken(String authHeader) {
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
    throw new IllegalArgumentException("Encabezado de autorización inválido");
  }
}
