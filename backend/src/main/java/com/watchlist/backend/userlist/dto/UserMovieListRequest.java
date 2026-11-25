package com.watchlist.backend.userlist.dto;

import java.util.UUID;

import com.watchlist.backend.userlist.MovieListType;

public record UserMovieListRequest(
        UUID movieId,
        MovieListType listType) {
}