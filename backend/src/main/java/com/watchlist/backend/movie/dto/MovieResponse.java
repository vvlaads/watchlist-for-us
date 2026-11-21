package com.watchlist.backend.movie.dto;

import java.util.UUID;

import com.watchlist.backend.movie.MovieType;

public record MovieResponse(
        UUID uuid,
        String name,
        String description,
        String posterKey,
        MovieType type,
        Double averageRating,
        Long ratingCount) {
}
