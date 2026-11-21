package com.watchlist.backend.rating;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRatingRepository extends JpaRepository<MovieRating, UUID> {
    @Query("""
                SELECT AVG(r.rating)
                FROM MovieRating r
                WHERE r.movie.uuid = :movieId
            """)
    Double findAverageRatingByMovieId(@Param("movieId") UUID movieId);

    @Query("""
                SELECT COUNT(r)
                FROM MovieRating r
                WHERE r.movie.uuid = :movieId
            """)
    Long countByMovieId(@Param("movieId") UUID movieId);

    @Query("""
                SELECT r.rating
                FROM MovieRating r
                WHERE r.movie.uuid = :movieId
                AND r.user.uuid = :userId
            """)
    Optional<Integer> findUserRating(
            @Param("movieId") UUID movieId,
            @Param("userId") UUID userId);

    Optional<MovieRating> findByMovieUuidAndUserUuid(UUID movieId, UUID userId);
}
