import { Component } from '@angular/core';
import { GenreSelector } from '../genre-selector/genre-selector';

@Component({
  imports: [GenreSelector],
  selector: 'app-filter-list',
  styleUrl: './filter-list.scss',
  templateUrl: './filter-list.html',
})
export class FilterList {

  public applyFilters() { }

  public resetFilters() { }
}
