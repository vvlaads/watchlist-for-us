package com.watchlist.backend.auth;

import java.util.UUID;

public record UserResponse(
                UUID id,
                String username,
                UserRole role) {
}