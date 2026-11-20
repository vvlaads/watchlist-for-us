import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/Movie';
import { PosterService } from '../../services/poster-service';
import { MOVIE_TYPE_STYLES } from '../../utils/movie-type-styles';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgStyle, RouterLink],
  selector: 'app-movie-card',
  styleUrl: './movie-card.scss',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  @Input()
  public movie: Movie | null = null;

  readonly typeStyles = MOVIE_TYPE_STYLES;

  constructor(public posterService: PosterService) { }
}
