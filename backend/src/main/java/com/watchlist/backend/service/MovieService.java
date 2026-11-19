package com.watchlist.backend.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.watchlist.backend.entity.Movie;
import com.watchlist.backend.repository.MovieRepository;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final PosterStorageService posterStorageService;

    public MovieService(MovieRepository movieRepository, PosterStorageService posterStorageService) {
        this.movieRepository = movieRepository;
        this.posterStorageService = posterStorageService;
    }

    public Page<Movie> getPopularMovies(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }

    public Movie addMovie(Movie movie, MultipartFile poster) throws IOException {
        if (poster != null && !poster.isEmpty()) {
            String posterKey = posterStorageService.upload(poster);
            movie.setPosterKey(posterKey);
        }

        return movieRepository.save(movie);
    }

    public Movie getMovieById(UUID id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Movie not found"));
    }

    public Movie updateMovie(UUID id, Movie newMovie) {
        Movie oldMovie = getMovieById(id);

        oldMovie.setPosterKey(newMovie.getPosterKey());
        oldMovie.setName(newMovie.getName());
        oldMovie.setDescription(newMovie.getDescription());
        oldMovie.setType(newMovie.getType());

        return movieRepository.save(oldMovie);
    }

    public void deleteMovie(UUID id) {
        Movie movie = getMovieById(id);
        movieRepository.delete(movie);
    }
}