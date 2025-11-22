package com.zonanquietud.backend.features.auth.domain.repository;

import java.util.Optional;

import com.zonanquietud.backend.features.auth.domain.model.Usuario;
import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

public interface UserRepository {
    Optional<Usuario> findByFirebaseUid(String firebaseUid);

    Optional<Usuario> findByEmail(UserEmail email);

    Usuario save(Usuario usuario);

    boolean existsByEmail(UserEmail email);
}