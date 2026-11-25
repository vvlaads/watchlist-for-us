import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../interfaces/Movie';
import { MovieService } from '../../../services/movie-service';
import { finalize } from 'rxjs';
import { Loading } from '../../../shared/components/loading/loading';
import { MovieForm } from '../../../shared/components/movie-form/movie-form';

@Component({
  imports: [Loading, MovieForm],
  selector: 'app-movie-edit-page',
  styleUrl: './movie-edit-page.scss',
  templateUrl: './movie-edit-page.html',
})
export class MovieEditPage implements OnInit {
  public movie: WritableSignal<Movie | null> = signal(null);
  public loading: WritableSignal<boolean> = signal(true);

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadMovieById(id);
    }
  }

  private loadMovieById(id: string) {
    this.movieService.getMovieById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.movie.set(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
