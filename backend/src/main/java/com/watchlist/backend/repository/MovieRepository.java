package com.watchlist.backend.repository;

import com.watchlist.backend.entity.Movie;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, UUID> {

}
