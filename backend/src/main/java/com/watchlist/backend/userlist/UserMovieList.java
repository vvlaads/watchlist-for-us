package com.watchlist.backend.userlist;

import java.time.Instant;
import java.util.UUID;

import com.watchlist.backend.auth.User;
import com.watchlist.backend.movie.Movie;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_movie_lists", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "movie_id" })
})
public class UserMovieList {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Enumerated(EnumType.STRING)
    @Column(name = "list_type", nullable = false)
    private MovieListType listType;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public UserMovieList() {
    }
}
