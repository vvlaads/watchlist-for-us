package com.watchlist.backend.rating;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.watchlist.backend.rating.dto.RatingRequest;
import com.watchlist.backend.rating.dto.RatingResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/movies/{movieId}/rating")
public class MovieRatingController {

    private final MovieRatingService movieRatingService;

    public MovieRatingController(MovieRatingService movieRatingService) {
        this.movieRatingService = movieRatingService;
    }

    @GetMapping
    public ResponseEntity<RatingResponse> getMovieRating(@PathVariable UUID movieId) {

        return ResponseEntity.ok(
                movieRatingService.getMovieRatingByMovieId(movieId));
    }

    @GetMapping("/me")
    public ResponseEntity<Integer> getUserRating(@PathVariable UUID movieId, Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        Integer rating = movieRatingService.getUserRating(movieId, userId);
        return ResponseEntity.ok(rating);
    }

    @PutMapping
    public ResponseEntity<Void> setMovieRating(
            @PathVariable UUID movieId,
            @Valid @RequestBody RatingRequest request,
            Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        movieRatingService.setMovieRating(movieId, userId, request.rating());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMovieRating(
            @PathVariable UUID movieId,
            Authentication authentication) {

        UUID userId = (UUID) authentication.getPrincipal();
        movieRatingService.deleteMovieRating(movieId, userId);

        return ResponseEntity.noContent().build();
    }
}