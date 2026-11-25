package com.watchlist.backend.rating;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.watchlist.backend.auth.UserRepository;
import com.watchlist.backend.movie.MovieRepository;
import com.watchlist.backend.rating.dto.RatingResponse;

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

        public Map<UUID, RatingResponse> getMovieRatings(Collection<UUID> movieIds) {
                return movieRatingRepository.findSummariesByMovieIds(movieIds)
                                .stream()
                                .collect(Collectors.toMap(
                                                MovieRatingSummary::getMovieId,
                                                summary -> new RatingResponse(
                                                                summary.getAverageRating(),
                                                                summary.getRatingCount())));
        }

        public RatingResponse getMovieRatingByMovieId(UUID movieId) {
                return getMovieRatings(List.of(movieId))
                                .getOrDefault(movieId, new RatingResponse(0.0, 0L));
        }

        public Integer getUserRating(UUID movieId, UUID userId) {
                return movieRatingRepository.findUserRating(movieId, userId)
                                .orElse(null);
        }

        public void setMovieRating(UUID movieId, UUID userId, Integer rating) {
                MovieRating movieRating = movieRatingRepository
                                .findByMovieIdAndUserId(movieId, userId)
                                .orElseGet(() -> {
                                        MovieRating newRating = new MovieRating();

                                        newRating.setMovie(movieRepository.findById(movieId)
                                                        .orElseThrow(() -> new IllegalArgumentException(
                                                                        "Movie not found")));

                                        newRating.setUser(userRepository.findById(userId)
                                                        .orElseThrow(() -> new IllegalArgumentException(
                                                                        "User not found")));

                                        return newRating;
                                });

                movieRating.setRating(rating);
                movieRatingRepository.save(movieRating);
        }

        public void deleteMovieRating(UUID movieId, UUID userId) {
                MovieRating movieRating = movieRatingRepository
                                .findByMovieIdAndUserId(movieId, userId)
                                .orElseThrow(() -> new IllegalArgumentException("Rating not found"));

                movieRatingRepository.delete(movieRating);
        }
}
