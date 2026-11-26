package com.watchlist.backend.userlist;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMovieListRepository extends JpaRepository<UserMovieList, UUID> {

        Page<UserMovieList> findAllByUserIdAndListType(
                        UUID userId,
                        MovieListType listType,
                        Pageable pageable);

        Page<UserMovieList> findAllByUserId(
                        UUID userId,
                        Pageable pageable);

        Page<UserMovieList> findAllByUserIdAndMovie_NameContainingIgnoreCase(
                        UUID userId,
                        String search,
                        Pageable pageable);

        Page<UserMovieList> findAllByUserIdAndListTypeAndMovie_NameContainingIgnoreCase(
                        UUID userId,
                        MovieListType listType,
                        String search,
                        Pageable pageable);

        Optional<UserMovieList> findByUserIdAndMovieId(
                        UUID userId,
                        UUID movieId);

        void deleteByUserIdAndMovieId(
                        UUID userId,
                        UUID movieId);
}