package com.watchlist.backend.userlist;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchlist.backend.movie.dto.MovieResponse;
import com.watchlist.backend.userlist.dto.UserMovieListRequest;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public ResponseEntity<Page<MovieResponse>> getMoviesInList(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) MovieListType listType,
            Authentication authentication,
            Pageable pageable) {

        UUID userId = (UUID) authentication.getPrincipal();

        return ResponseEntity.ok(userMovieListService.getMoviesInList(userId, listType, search, pageable));
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
