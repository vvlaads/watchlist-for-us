package com.watchlist.backend.userlist;

import com.watchlist.backend.rating.MovieRatingService;
import com.watchlist.backend.rating.dto.RatingResponse;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.watchlist.backend.auth.User;
import com.watchlist.backend.auth.UserRepository;
import com.watchlist.backend.movie.Movie;
import com.watchlist.backend.movie.MovieRepository;
import com.watchlist.backend.movie.dto.MovieMapper;
import com.watchlist.backend.movie.dto.MovieResponse;

import org.springframework.transaction.annotation.Transactional;

@Service
public class UserMovieListService {

    private final MovieRatingService movieRatingService;
    private final UserMovieListRepository userMovieListRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final MovieMapper movieMapper;

    public UserMovieListService(
            UserMovieListRepository userMovieListRepository,
            MovieRepository movieRepository,
            MovieRatingService movieRatingService,
            UserRepository userRepository,
            MovieMapper movieMapper) {
        this.userMovieListRepository = userMovieListRepository;
        this.movieRepository = movieRepository;
        this.movieRatingService = movieRatingService;
        this.userRepository = userRepository;
        this.movieMapper = movieMapper;
    }

    @Transactional
    public void addMovieToList(UUID userId, UUID movieId, MovieListType listType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        UserMovieList userMovieList = userMovieListRepository
                .findByUserIdAndMovieId(userId, movieId)
                .orElseGet(UserMovieList::new);

        userMovieList.setUser(user);
        userMovieList.setMovie(movie);
        userMovieList.setListType(listType);

        userMovieListRepository.save(userMovieList);
    }

    @Transactional(readOnly = true)
    public List<MovieResponse> getMoviesInList(
            UUID userId,
            MovieListType movieListType) {

        return userMovieListRepository
                .findAllByUserIdAndListType(userId, movieListType)
                .stream()
                .map(userMovieList -> {
                    Movie movie = userMovieList.getMovie();
                    RatingResponse rating = movieRatingService.getMovieRatingByMovieId(movie.getId());
                    return movieMapper.toResponse(movie, rating);
                })
                .toList();
    }

    @Transactional
    public void deleteMovieFromList(UUID userId, UUID movieId) {
        userMovieListRepository.deleteByUserIdAndMovieId(userId, movieId);
    }
}
