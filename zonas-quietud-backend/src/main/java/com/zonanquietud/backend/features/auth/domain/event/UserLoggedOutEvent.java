package com.zonanquietud.backend.features.auth.domain.event;

import java.time.LocalDateTime;
import java.util.UUID;

public class UserLoggedOutEvent {

  private final UUID userId;
  private final LocalDateTime occurredAt;

  public UserLoggedOutEvent(UUID userId, LocalDateTime occurredAt) {
    this.userId = userId;
    this.occurredAt = occurredAt;
  }

  public UUID getUserId() {
    return userId;
  }

  public LocalDateTime getOccurredAt() {
    return occurredAt;
  }

  @Override
  public String toString() {
    return "UserLoggedOutEvent{" +
        "userId=" + userId +
        ", occurredAt=" + occurredAt +
        '}';
  }
}
