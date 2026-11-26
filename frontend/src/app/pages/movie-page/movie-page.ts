import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/Movie';
import { MovieService } from '../../services/movie-service';
import { PosterService } from '../../services/poster-service';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { MovieRatingModal } from '../../shared/components/movie-rating-modal/movie-rating-modal';
import { MovieListService } from '../../services/movie-list.service';
import { MovieListType } from '../../interfaces/MovieListType';
import { LIST_TYPES } from '../../constants/list-types';

@Component({
  imports: [MovieCard, MovieRatingModal],
  selector: 'app-movie-page',
  styleUrl: './movie-page.scss',
  templateUrl: './movie-page.html',
})
export class MoviePage {
  public movie: WritableSignal<Movie | null> = signal(null);
  public movies: WritableSignal<Movie[]> = signal([]);
  public selectedList: MovieListType | null = null;
  listTypes = LIST_TYPES;

  constructor(private route: ActivatedRoute, private movieService: MovieService, public posterService: PosterService, private movieListService: MovieListService) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe({
        next: (movie) => {
          this.movie.set(movie);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  showRatingModal = false;

  openMovieRatingModal(): void {
    this.showRatingModal = true;
  }

  closeMovieRatingModal(): void {
    this.showRatingModal = false;
  }

  public setMovieRating(rating: number) {
    const currentMovie = this.movie();

    if (currentMovie) {
      console.log(rating);
      this.movieService.setMovieRating(currentMovie.id, rating).subscribe({
        next: () => {
          console.log("+");
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  public addToList(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedList = select.value as MovieListType;

    const currentMovie = this.movie();

    if (currentMovie) {
      this.movieListService.addMovieToList(currentMovie.id, this.selectedList).subscribe({
        next: () => {
          console.log("add to list");
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
