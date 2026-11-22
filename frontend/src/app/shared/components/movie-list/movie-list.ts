import { Component, Input } from '@angular/core';
import { Movie } from '../../../interfaces/Movie';
import { MovieCard } from '../movie-card/movie-card';
import { Loading } from '../loading/loading';

@Component({
  imports: [Loading, MovieCard],
  selector: 'app-movie-list',
  styleUrl: './movie-list.scss',
  templateUrl: './movie-list.html',
})
export class MovieList {
  @Input()
  public movies: Movie[] = [];

  @Input()
  public loading: boolean = true;

  @Input()
  public link: string = '/movies';
}
