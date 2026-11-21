import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/Movie';
import { MovieService } from '../../services/movie-service';
import { PosterService } from '../../services/poster-service';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  imports: [MovieCard],
  selector: 'app-movie-page',
  styleUrl: './movie-page.scss',
  templateUrl: './movie-page.html',
})
export class MoviePage {
  public movie: WritableSignal<Movie | null> = signal(null);
  public movies: WritableSignal<Movie[]> = signal([]);

  constructor(private route: ActivatedRoute, private movieService: MovieService, public posterService: PosterService) { }

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
}
