import { Component, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../interfaces/Movie';
import { MovieService } from '../../services/movie-service';
import { SearchService } from '../../services/search-service';
import { Search } from '../../shared/components/search/search';
import { MovieList } from '../../shared/components/movie-list/movie-list';
import { FilterList } from '../../shared/components/filter-list/filter-list';

@Component({
  imports: [Search, MovieList, FilterList],
  selector: 'app-for-you-page',
  styleUrl: './for-you-page.scss',
  templateUrl: './for-you-page.html',
})
export class ForYouPage {
  public loading: WritableSignal<boolean> = signal(true);
  public movies: WritableSignal<Movie[]> = signal([]);

  private search;

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
