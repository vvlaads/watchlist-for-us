import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SelectOption } from '../../interfaces/SelectiOption';
import { CategorySelector } from '../../shared/components/category-selector/category-selector';
import { MovieList } from '../../shared/components/movie-list/movie-list';
import { Movie } from '../../interfaces/Movie';
import { MovieListService } from '../../services/movie-list.service';
import { MovieListType } from '../../interfaces/MovieListType';
import { Search } from '../../shared/components/search/search';
import { SearchService } from '../../services/search-service';
import { Loading } from '../../shared/components/loading/loading';

@Component({
  imports: [CategorySelector, MovieList, Search, Loading],
  selector: 'app-my-library-page',
  styleUrl: './my-library-page.scss',
  templateUrl: './my-library-page.html',
})
export class MyLibraryPage implements OnInit {
  public selectedStatus: MovieListType | null = null;

  public listStatuses: SelectOption<MovieListType | null>[] = [
    { value: null, label: 'Все' },
    { value: MovieListType.PLANNED, label: 'Хочу посмотреть' },
    { value: MovieListType.WATCHING, label: 'Смотрю' },
    { value: MovieListType.WATCHED, label: 'Просмотрено' },
    { value: MovieListType.DROPPED, label: 'Брошено' }
  ];

  public movies: WritableSignal<Movie[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(true);


  private search;

  constructor(private movieListService: MovieListService, private searchService: SearchService) {
    this.search = this.searchService.createSearchStream();
  }

  public ngOnInit(): void {
    this.loadMoviesInSelectedList();

    this.search.search.subscribe(query => {
      this.loadMoviesInSelectedList(query);
    });
  }

  private loadMoviesInSelectedList(search = '') {
    this.movieListService.getMoviesInList({
      listType: this.selectedStatus ?? undefined,
      search: search
    }).subscribe({
      next: (response) => {
        this.movies.set(response.content);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
      }
    })
  }

  public onSearchChange(query: string): void {
    this.search.setSearch(query);
  }

  public selectListType(event: MovieListType | null) {
    this.selectedStatus = event;
    this.loadMoviesInSelectedList();
  }
}
