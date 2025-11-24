package com.zonanquietud.backend.features.auth.domain.event;

import java.time.LocalDateTime;
import java.util.UUID;

import com.zonanquietud.backend.features.auth.domain.valueobject.UserEmail;

public class UserRegisteredEvent {

  private final UUID userId;
  private final UserEmail email;
  private final LocalDateTime occurredAt;

  public UserRegisteredEvent(UUID userId, UserEmail email, LocalDateTime occurredAt) {
    this.userId = userId;
    this.email = email;
    this.occurredAt = occurredAt;
  }

  public UUID getUserId() {
    return userId;
  }

  public UserEmail getEmail() {
    return email;
  }

  public LocalDateTime getOccurredAt() {
    return occurredAt;
  }

  @Override
  public String toString() {
    return "UserRegisteredEvent{" +
        "userId=" + userId +
        ", email=" + email +
        ", occurredAt=" + occurredAt +
        '}';
  }
}
