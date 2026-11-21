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

import com.watchlist.backend.movie.dto.MovieResponse;
import com.watchlist.backend.rating.MovieRatingService;
import com.watchlist.backend.rating.dto.RatingResponse;
import com.watchlist.backend.service.PosterStorageService;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final PosterStorageService posterStorageService;
    private final MovieRatingService movieRatingService;

    public MovieService(MovieRepository movieRepository, PosterStorageService posterStorageService,
            MovieRatingService movieRatingService) {
        this.movieRepository = movieRepository;
        this.posterStorageService = posterStorageService;
        this.movieRatingService = movieRatingService;
    }

    private MovieResponse toResponse(Movie movie) {
        RatingResponse rating = movieRatingService.getMovieRatingByMovieId(movie.getUuid());

        return new MovieResponse(
                movie.getUuid(),
                movie.getName(),
                movie.getDescription(),
                movie.getPosterKey(),
                movie.getType(),
                rating.averageRating(),
                rating.ratingCount());
    }

    private MovieResponse toResponse(Movie movie, RatingResponse rating) {
        return new MovieResponse(
                movie.getUuid(),
                movie.getName(),
                movie.getDescription(),
                movie.getPosterKey(),
                movie.getType(),
                rating.averageRating(),
                rating.ratingCount());
    }

    private Movie findMovieById(UUID id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Movie not found"));
    }

    public Page<MovieResponse> getPopularMovies(Pageable pageable) {
        Page<Movie> movies = movieRepository.findAll(pageable);

        List<UUID> movieIds = movies.getContent()
                .stream()
                .map(Movie::getUuid)
                .toList();

        Map<UUID, RatingResponse> ratings = movieRatingService.getMovieRatings(movieIds);

        return movies.map(movie -> {
            RatingResponse rating = ratings.getOrDefault(
                    movie.getUuid(),
                    new RatingResponse(0.0, 0L));

            return toResponse(movie, rating);
        });
    }

    public Page<MovieResponse> getRecommendedMovies(Pageable pageable) {
        Page<Movie> movies = movieRepository.findAll(pageable);

        List<UUID> movieIds = movies.getContent()
                .stream()
                .map(Movie::getUuid)
                .toList();

        Map<UUID, RatingResponse> ratings = movieRatingService.getMovieRatings(movieIds);

        return movies.map(movie -> {
            RatingResponse rating = ratings.getOrDefault(
                    movie.getUuid(),
                    new RatingResponse(0.0, 0L));

            return toResponse(movie, rating);
        });
    }

    public MovieResponse addMovie(Movie movie, MultipartFile poster) throws IOException {
        if (poster != null && !poster.isEmpty()) {
            String posterKey = posterStorageService.upload(poster);
            movie.setPosterKey(posterKey);
        }

        Movie savedMovie = movieRepository.save(movie);

        return toResponse(savedMovie);
    }

    public MovieResponse getMovieById(UUID id) {
        Movie movie = findMovieById(id);
        RatingResponse rating = movieRatingService.getMovieRatingByMovieId(id);

        return toResponse(movie, rating);
    }

    public MovieResponse updateMovie(UUID id, Movie newMovie) {
        Movie oldMovie = findMovieById(id);

        oldMovie.setPosterKey(newMovie.getPosterKey());
        oldMovie.setName(newMovie.getName());
        oldMovie.setDescription(newMovie.getDescription());
        oldMovie.setType(newMovie.getType());

        return toResponse(movieRepository.save(oldMovie));
    }

    public void deleteMovie(UUID id) {
        Movie movie = findMovieById(id);
        movieRepository.delete(movie);
    }
}