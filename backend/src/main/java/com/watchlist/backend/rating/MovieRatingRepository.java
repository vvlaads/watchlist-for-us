package com.watchlist.backend.rating;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRatingRepository extends JpaRepository<MovieRating, UUID> {
    @Query("""
                SELECT AVG(r.rating)
                FROM MovieRating r
                WHERE r.movie.id = :movieId
            """)
    Double findAverageRatingByMovieId(@Param("movieId") UUID movieId);

    @Query("""
                SELECT COUNT(r)
                FROM MovieRating r
                WHERE r.movie.id = :movieId
            """)
    Long countByMovieId(@Param("movieId") UUID movieId);

    @Query("""
                SELECT r.rating
                FROM MovieRating r
                WHERE r.movie.id = :movieId
                AND r.user.id = :userId
            """)
    Optional<Integer> findUserRating(
            @Param("movieId") UUID movieId,
            @Param("userId") UUID userId);

    Optional<MovieRating> findByMovieIdAndUserId(UUID movieId, UUID userId);

    @Query("""
                SELECT
                    r.movie.id AS movieId,
                    AVG(r.rating) AS averageRating,
                    COUNT(r) AS ratingCount
                FROM MovieRating r
                WHERE r.movie.id IN :movieIds
                GROUP BY r.movie.id
            """)
    List<MovieRatingSummary> findSummariesByMovieIds(@Param("movieIds") Collection<UUID> movieIds);
}
