import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Search } from '../../../shared/components/search/search';
import { MovieList } from '../../../shared/components/movie-list/movie-list';
import { MovieService } from '../../../services/movie-service';
import { Movie } from '../../../interfaces/Movie';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../../services/search-service';

@Component({
  imports: [Search, MovieList, RouterLink],
  selector: 'app-moderation-movies-page',
  styleUrl: './moderation-movies-page.scss',
  templateUrl: './moderation-movies-page.html',
})
export class ModerationMoviesPage implements OnInit {
  public movies: WritableSignal<Movie[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(true);

  public search;

  constructor(private movieService: MovieService, private searchService: SearchService) {
    this.search = this.searchService.createSearchStream();
  }

  public ngOnInit(): void {
    this.loadMovies();

    this.search.search.subscribe(query => {
      this.loadMovies(query);
    });
  }

  public onSearchChange(query: string): void {
    this.search.setSearch(query);
  }

  public loadMovies(search = ''): void {
    this.loading.set(true);

    this.movieService.getMovies(0, 20, search).subscribe({
      next: response => {
        this.movies.set(response.content);
        this.loading.set(false);
      },
      error: error => {
        console.error('Ошибка загрузки фильмов', error);
        this.loading.set(false);
      }
    });
  }
}