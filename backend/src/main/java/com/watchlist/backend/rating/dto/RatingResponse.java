package com.watchlist.backend.rating.dto;

public record RatingResponse(
        Double averageRating,
        Long ratingCount) {
}