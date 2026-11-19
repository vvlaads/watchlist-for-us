import { Component, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/Movie';
import { PosterService } from '../../services/poster-service';

@Component({
  imports: [],
  selector: 'app-popular-page',
  styleUrl: './popular-page.scss',
  templateUrl: './popular-page.html',
})
export class PopularPage implements OnInit {
  constructor(private movieService: MovieService, public posterService: PosterService) { }

  public movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.movieService.getPopularMovies(0, 20).subscribe({
      next: (value) => {
        this.movies.set(value.content);
      },
      error: (error) => {
        console.error('Ошибка загрузки популярных фильмов', error);
      }
    });
  }
}
