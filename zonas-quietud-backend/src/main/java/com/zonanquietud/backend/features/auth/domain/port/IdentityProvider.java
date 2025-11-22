package com.zonanquietud.backend.features.auth.domain.port;

import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

public interface IdentityProvider {
  // Verifica el token que viene del frontend y devuelve el UID de Firebase
  String verifyToken(String token);

  // (Opcional) Si necesitas obtener el email desde el token
  UserEmail getEmailFromToken(String token);
}
