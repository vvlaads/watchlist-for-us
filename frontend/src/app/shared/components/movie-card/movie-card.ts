import { Component, Input } from '@angular/core';
import { Movie } from '../../../interfaces/Movie';
import { PosterService } from '../../../services/poster-service';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOVIE_TYPES } from '../../../constants/movie-types';
import { MovieTypeItem } from '../../../interfaces/MovieTypeItem';

@Component({
  imports: [NgStyle, RouterLink],
  selector: 'app-movie-card',
  styleUrl: './movie-card.scss',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  @Input()
  public movie: Movie | null = null;

  @Input()
  public link: string | null = null;

  public readonly movieTypes = MOVIE_TYPES;

  constructor(public posterService: PosterService) { }
}
