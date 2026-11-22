import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MovieList } from '../../shared/components/movie-list/movie-list';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/Movie';
import { Search } from '../../shared/components/search/search';
import { SearchService } from '../../services/search-service';
import { FilterList } from '../../shared/components/filter-list/filter-list';
import { SelectOption } from '../../interfaces/SelectiOption';
import { CategorySelector } from '../../shared/components/category-selector/category-selector';
import { MovieType } from '../../interfaces/MovieType';

@Component({
  imports: [MovieList, Search, FilterList, CategorySelector],
  selector: 'app-catalog-page',
  styleUrl: './catalog-page.scss',
  templateUrl: './catalog-page.html',
})
export class CatalogPage implements OnInit {
  public loading: WritableSignal<boolean> = signal(true);
  public movies: WritableSignal<Movie[]> = signal([]);

  public selectedType = signal<MovieType | null>(null);

  public movieTypes: SelectOption<MovieType | null>[] = [
    { value: null, label: 'Все' },
    { value: MovieType.ANIME, label: 'Аниме' },
    { value: MovieType.FILM, label: 'Фильмы' },
    { value: MovieType.CARTOON, label: 'Мультфильмы' }
  ];

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

  public onTypeChange(type: MovieType | null): void {
    this.selectedType.set(type);
    this.loadMovies();
  }

  public loadMovies(search = ''): void {
    this.loading.set(true);

    this.movieService.getMovies({
      page: 0,
      size: 20,
      search,
      type: this.selectedType() ?? undefined
    }).subscribe({
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