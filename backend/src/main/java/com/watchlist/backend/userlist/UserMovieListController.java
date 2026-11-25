package com.watchlist.backend.userlist;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchlist.backend.movie.dto.MovieResponse;
import com.watchlist.backend.userlist.dto.UserMovieListRequest;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/lists")
public class UserMovieListController {

    private final UserMovieListService userMovieListService;

    public UserMovieListController(UserMovieListService userMovieListService) {
        this.userMovieListService = userMovieListService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addMovieToList(
            Authentication authentication,
            @RequestBody UserMovieListRequest request) {
        UUID userId = (UUID) authentication.getPrincipal();

        userMovieListService.addMovieToList(
                userId,
                request.movieId(),
                request.listType());
    }

    @GetMapping("/{listType}")
    public List<MovieResponse> getMoviesInList(
            Authentication authentication,
            @PathVariable MovieListType listType) {

        UUID userId = (UUID) authentication.getPrincipal();

        return userMovieListService.getMoviesInList(userId, listType);
    }

    @DeleteMapping("/{movieId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMovieFromList(
            Authentication authentication,
            @PathVariable UUID movieId) {

        UUID userId = (UUID) authentication.getPrincipal();

        userMovieListService.deleteMovieFromList(userId, movieId);
    }

}
