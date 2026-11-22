import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-search',
  styleUrl: './search.scss',
  templateUrl: './search.html',
})
export class Search {
  @Input() public placeholder = 'Поиск';
  @Input() public value = '';

  @Output() public searchChange = new EventEmitter<string>();

  public onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
