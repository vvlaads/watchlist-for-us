import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MovieList } from '../../shared/components/movie-list/movie-list';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/Movie';
import { finalize } from 'rxjs';

@Component({
  imports: [MovieList],
  selector: 'app-catalog-page',
  styleUrl: './catalog-page.scss',
  templateUrl: './catalog-page.html',
})
export class CatalogPage implements OnInit {
  public loading: WritableSignal<boolean> = signal(true);
  public movies: WritableSignal<Movie[]> = signal([]);

  constructor(private movieService: MovieService) { }

  public ngOnInit(): void {
    this.movieService.getMovies(0, 20)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.movies.set(response.content)
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}