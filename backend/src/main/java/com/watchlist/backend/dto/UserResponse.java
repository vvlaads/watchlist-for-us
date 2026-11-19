package com.watchlist.backend.dto;

import java.util.UUID;
import com.watchlist.backend.entity.UserRole;

public record UserResponse(
        UUID uuid,
        String username,
        UserRole role) {
}