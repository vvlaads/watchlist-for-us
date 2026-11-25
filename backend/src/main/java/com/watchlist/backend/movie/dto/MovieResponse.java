package com.watchlist.backend.movie.dto;

import java.util.Set;
import java.util.UUID;

import com.watchlist.backend.movie.Genre;
import com.watchlist.backend.movie.MovieType;

public record MovieResponse(
        UUID id,
        String name,
        String description,
        String posterKey,
        MovieType type,
        Double averageRating,
        Long ratingCount,
        Set<Genre> genres,
        Genre primaryGenre,
        Integer releaseYear) {
}
