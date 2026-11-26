import { Component, ElementRef, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { MovieList } from '../../shared/components/movie-list/movie-list';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/Movie';
import { Search } from '../../shared/components/search/search';
import { SearchService } from '../../services/search-service';
import { FilterList } from '../../shared/components/filter-list/filter-list';
import { SelectOption } from '../../interfaces/SelectiOption';
import { CategorySelector } from '../../shared/components/category-selector/category-selector';
import { MovieType } from '../../interfaces/MovieType';
import { ROWS_ON_PAGE } from '../../constants/movie';

@Component({
  imports: [MovieList, Search, FilterList, CategorySelector],
  selector: 'app-catalog-page',
  styleUrl: './catalog-page.scss',
  templateUrl: './catalog-page.html',
})
export class CatalogPage implements OnInit {
  public movies: WritableSignal<Movie[]> = signal([]);

  public selectedType = signal<MovieType | null>(null);

  public loading = signal(true);
  public lastPage = signal(-1);
  public hasMore = signal(true);
  public pageSize: WritableSignal<number> = signal(10);

  private currentSearch = '';

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
      this.currentSearch = query;
      this.loadMovies();
    });
  }

  public onSearchChange(query: string): void {
    this.search.setSearch(query);
  }

  private loadPage(page: number): void {
    this.loading.set(true);

    this.movieService.getMovies({
      page,
      size: this.pageSize(),
      search: this.currentSearch,
      type: this.selectedType() ?? undefined
    }).subscribe({
      next: response => {
        this.movies.update(movies => [
          ...movies,
          ...response.content
        ]);

        this.lastPage.set(page);
        this.hasMore.set(!response.last);
        this.loading.set(false);
      },
      error: error => {
        console.error('Ошибка загрузки фильмов', error);
        this.loading.set(false);
      }
    });
  }

  public loadMovies(): void {
    this.lastPage.set(-1);
    this.movies.set([]);
    this.hasMore.set(true);
    this.loadPage(0);
  }

  public loadNextPage(): void {
    // Не отправляем повторный запрос, пока предыдущий выполняется.
    if (this.loading() || !this.hasMore()) return;

    this.loadPage(this.lastPage() + 1);
  }
  public onTypeChange(type: MovieType | null): void {
    this.selectedType.set(type);
    this.loadMovies();
  }

  public onColumnsChange(columns: number): void {
    const newPageSize = columns * ROWS_ON_PAGE;

    if (this.pageSize() !== newPageSize) {
      this.pageSize.set(newPageSize);
      this.loadMovies();
    }
  }
}