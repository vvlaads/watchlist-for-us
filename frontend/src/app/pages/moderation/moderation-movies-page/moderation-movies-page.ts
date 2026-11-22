import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Search } from '../../../shared/components/search/search';
import { MovieList } from '../../../shared/components/movie-list/movie-list';
import { MovieService } from '../../../services/movie-service';
import { Movie } from '../../../interfaces/Movie';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Search, MovieList, RouterLink],
  selector: 'app-moderation-movies-page',
  styleUrl: './moderation-movies-page.scss',
  templateUrl: './moderation-movies-page.html',
})
export class ModerationMoviesPage implements OnInit {
  public movies: WritableSignal<Movie[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(true);

  constructor(private movieService: MovieService) { }

  public ngOnInit(): void {
    this.movieService.getMovies(0, 20)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.movies.set(response.content);
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}