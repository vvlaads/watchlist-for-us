package com.watchlist.backend.rating.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RatingRequest(
        @NotNull(message = "Rating is required") @Min(value = 1, message = "Rating must be at least 1") @Max(value = 10, message = "Rating must be at most 10") Integer rating) {
}