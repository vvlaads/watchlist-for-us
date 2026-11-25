package com.watchlist.backend.movie.dto;

import org.springframework.stereotype.Component;

import com.watchlist.backend.movie.Movie;
import com.watchlist.backend.rating.dto.RatingResponse;

@Component
public class MovieMapper {
    public MovieResponse toResponse(Movie movie, RatingResponse rating) {
        return new MovieResponse(
                movie.getId(),
                movie.getName(),
                movie.getDescription(),
                movie.getPosterKey(),
                movie.getType(),
                rating.averageRating(),
                rating.ratingCount(),
                movie.getGenres(),
                movie.getPrimaryGenre(),
                movie.getReleaseYear());
    }
}
