package com.watchlist.backend.rating;

import java.util.UUID;

public interface MovieRatingSummary {
    UUID getMovieId();

    Double getAverageRating();

    Long getRatingCount();
}