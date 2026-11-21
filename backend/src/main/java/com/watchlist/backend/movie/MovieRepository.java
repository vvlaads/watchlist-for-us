package com.watchlist.backend.movie;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, UUID> {

}
