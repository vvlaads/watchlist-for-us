package com.watchlist.backend.rating;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.watchlist.backend.movie.MovieRepository;
import com.watchlist.backend.rating.dto.RatingResponse;
import com.watchlist.backend.repository.UserRepository;

@Service
public class MovieRatingService {
    private final MovieRatingRepository movieRatingRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public MovieRatingService(
            MovieRatingRepository movieRatingRepository,
            MovieRepository movieRepository,
            UserRepository userRepository) {
        this.movieRatingRepository = movieRatingRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
    }

    public RatingResponse getMovieRatingByMovieId(UUID movieId) {
        Double averageRating = movieRatingRepository.findAverageRatingByMovieId(movieId);
        Long ratingCount = movieRatingRepository.countByMovieId(movieId);

        return new RatingResponse(
                averageRating != null ? averageRating : 0.0,
                ratingCount);
    }

    public Integer getUserRating(UUID movieId, UUID userId) {
        return movieRatingRepository.findUserRating(movieId, userId)
                .orElse(null);
    }

    public void setMovieRating(UUID movieId, UUID userId, Integer rating) {
        MovieRating movieRating = movieRatingRepository
                .findByMovieUuidAndUserUuid(movieId, userId)
                .orElseGet(() -> {
                    MovieRating newRating = new MovieRating();

                    newRating.setMovie(movieRepository.findById(movieId)
                            .orElseThrow(() -> new IllegalArgumentException("Movie not found")));

                    newRating.setUser(userRepository.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("User not found")));

                    return newRating;
                });

        movieRating.setRating(rating);
        movieRatingRepository.save(movieRating);
    }

    public void deleteMovieRating(UUID movieId, UUID userId) {
        MovieRating movieRating = movieRatingRepository
                .findByMovieUuidAndUserUuid(movieId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Rating not found"));

        movieRatingRepository.delete(movieRating);
    }
}
