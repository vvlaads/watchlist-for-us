import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../interfaces/Genre';
import { GenreOption } from '../../../interfaces/GenreOption';

@Component({
  imports: [],
  selector: 'app-genre-selector',
  styleUrl: './genre-selector.scss',
  templateUrl: './genre-selector.html',
})
export class GenreSelector {
  @Input({ required: true })
  public genres: GenreOption[] = [];

  @Input({ required: true })
  public selected: Genre[] = [];

  @Output()
  public selectedChange: EventEmitter<Genre[]> = new EventEmitter<Genre[]>();

  public toggleGenre(genre: Genre): void {
    const selected = this.selected;

    const updated = selected.includes(genre)
      ? selected.filter(item => item !== genre)
      : [...selected, genre];

    this.selectedChange.emit(updated);
  }
}
