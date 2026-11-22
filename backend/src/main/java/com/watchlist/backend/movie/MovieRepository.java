package com.watchlist.backend.movie;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
        @Query("""
                        SELECT m FROM Movie m
                        WHERE (:type IS NULL OR m.type = :type)
                        """)
        Page<Movie> findByType(
                        @Param("type") MovieType type,
                        Pageable pageable);

        @Query("""
                        SELECT m FROM Movie m
                        WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%'))
                        AND (:type IS NULL OR m.type = :type)
                        """)
        Page<Movie> searchMovies(
                        @Param("search") String search,
                        @Param("type") MovieType type,
                        Pageable pageable);
}
