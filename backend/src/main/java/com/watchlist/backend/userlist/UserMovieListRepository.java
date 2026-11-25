package com.watchlist.backend.userlist;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMovieListRepository extends JpaRepository<UserMovieList, UUID> {

    List<UserMovieList> findAllByUserIdAndListType(
            UUID userId,
            MovieListType listType);

    Optional<UserMovieList> findByUserIdAndMovieId(
            UUID userId,
            UUID movieId);

    void deleteByUserIdAndMovieId(
            UUID userId,
            UUID movieId);
}