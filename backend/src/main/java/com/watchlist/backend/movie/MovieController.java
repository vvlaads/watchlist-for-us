package com.watchlist.backend.movie;

import java.io.IOException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.watchlist.backend.movie.dto.MovieResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<Page<MovieResponse>> getMovies(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) MovieType type,
            Pageable pageable) {

        return ResponseEntity.ok(movieService.getMovies(search, type, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> getMovie(@PathVariable UUID id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MovieResponse> addMovie(@RequestPart("movie") Movie movie,
            @RequestPart(value = "poster", required = false) MultipartFile poster) throws IOException {
        MovieResponse saved = movieService.addMovie(movie, poster);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MovieResponse> updateMovie(
            @PathVariable UUID id,
            @RequestPart("movie") Movie movie,
            @RequestPart(value = "poster", required = false) MultipartFile poster) throws IOException {

        return ResponseEntity.ok(movieService.updateMovie(id, movie, poster));
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable UUID id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}
