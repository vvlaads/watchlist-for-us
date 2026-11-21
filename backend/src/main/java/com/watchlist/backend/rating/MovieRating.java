package com.watchlist.backend.rating;

import java.util.UUID;

import com.watchlist.backend.entity.User;
import com.watchlist.backend.movie.Movie;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "movie_ratings", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "movie_id" })
})
public class MovieRating {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(nullable = false)
    private Integer rating;
}
