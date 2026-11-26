package com.watchlist.backend.userlist;

import com.watchlist.backend.rating.MovieRatingService;
import com.watchlist.backend.rating.dto.RatingResponse;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<MovieResponse> getMoviesInList(
            UUID userId,
            MovieListType movieListType,
            String search,
            Pageable pageable) {

        Page<UserMovieList> userMovieLists;

        if (search != null && !search.isBlank()) {
            if (movieListType != null) {
                userMovieLists = userMovieListRepository
                        .findAllByUserIdAndListTypeAndMovie_NameContainingIgnoreCase(
                                userId, movieListType, search, pageable);
            } else {
                userMovieLists = userMovieListRepository
                        .findAllByUserIdAndMovie_NameContainingIgnoreCase(
                                userId, search, pageable);
            }
        } else {
            if (movieListType != null) {
                userMovieLists = userMovieListRepository
                        .findAllByUserIdAndListType(userId, movieListType, pageable);
            } else {
                userMovieLists = userMovieListRepository
                        .findAllByUserId(userId, pageable);
            }
        }

        return userMovieLists.map(userMovieList -> {
            Movie movie = userMovieList.getMovie();

            RatingResponse rating = movieRatingService
                    .getMovieRatingByMovieId(movie.getId());

            return movieMapper.toResponse(movie, rating);
        });
    }

    @Transactional
    public void deleteMovieFromList(UUID userId, UUID movieId) {
        userMovieListRepository.deleteByUserIdAndMovieId(userId, movieId);
    }
}
