package com.watchlist.backend.movie;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
    @Query("""
            SELECT m
            FROM Movie m
            WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<Movie> searchMovies(
            @Param("search") String search,
            Pageable pageable);
}
