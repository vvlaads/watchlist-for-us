package com.watchlist.backend.movie;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.watchlist.backend.movie.dto.MovieMapper;
import com.watchlist.backend.movie.dto.MovieResponse;
import com.watchlist.backend.rating.MovieRatingService;
import com.watchlist.backend.rating.dto.RatingResponse;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final PosterStorageService posterStorageService;
    private final MovieRatingService movieRatingService;
    private final MovieMapper movieMapper;

    public MovieService(MovieRepository movieRepository, PosterStorageService posterStorageService,
            MovieRatingService movieRatingService, MovieMapper movieMapper) {
        this.movieRepository = movieRepository;
        this.posterStorageService = posterStorageService;
        this.movieRatingService = movieRatingService;
        this.movieMapper = movieMapper;
    }

    private Movie findMovieById(UUID id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Movie not found"));
    }

    public Page<MovieResponse> getMovies(String search, MovieType type, Pageable pageable) {
        Page<Movie> movies;

        if (search == null || search.isBlank()) {
            movies = type == null
                    ? movieRepository.findAll(pageable)
                    : movieRepository.findByType(type, pageable);
        } else {
            movies = movieRepository.searchMovies(search.trim(), type, pageable);
        }

        List<UUID> movieIds = movies.getContent()
                .stream()
                .map(Movie::getId)
                .toList();

        Map<UUID, RatingResponse> ratings = movieRatingService.getMovieRatings(movieIds);

        return movies.map(movie -> {
            RatingResponse rating = ratings.getOrDefault(
                    movie.getId(),
                    new RatingResponse(0.0, 0L));

            return movieMapper.toResponse(movie, rating);
        });
    }

    public MovieResponse addMovie(Movie movie, MultipartFile poster) throws IOException {
        if (poster != null && !poster.isEmpty()) {
            String posterKey = posterStorageService.upload(poster);
            movie.setPosterKey(posterKey);
        }

        Movie savedMovie = movieRepository.save(movie);

        RatingResponse rating = movieRatingService.getMovieRatingByMovieId(savedMovie.getId());

        return movieMapper.toResponse(savedMovie, rating);
    }

    public MovieResponse getMovieById(UUID id) {
        Movie movie = findMovieById(id);
        RatingResponse rating = movieRatingService.getMovieRatingByMovieId(id);

        return movieMapper.toResponse(movie, rating);
    }

    public MovieResponse updateMovie(UUID id, Movie newMovie, MultipartFile poster) throws IOException {
        Movie oldMovie = findMovieById(id);

        oldMovie.setName(newMovie.getName());
        oldMovie.setDescription(newMovie.getDescription());
        oldMovie.setType(newMovie.getType());
        oldMovie.setGenres(newMovie.getGenres());
        oldMovie.setPrimaryGenre(newMovie.getPrimaryGenre());
        oldMovie.setReleaseYear(newMovie.getReleaseYear());

        if (poster != null && !poster.isEmpty()) {
            String newPosterKey = posterStorageService.upload(poster);
            oldMovie.setPosterKey(newPosterKey);
        }

        RatingResponse rating = movieRatingService.getMovieRatingByMovieId(oldMovie.getId());

        return movieMapper.toResponse(movieRepository.save(oldMovie), rating);
    }

    public void deleteMovie(UUID id) {
        Movie movie = findMovieById(id);
        movieRepository.delete(movie);
    }
}