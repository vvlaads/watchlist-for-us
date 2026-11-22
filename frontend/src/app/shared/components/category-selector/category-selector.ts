import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../../../interfaces/SelectiOption';

@Component({
  imports: [],
  selector: 'app-category-selector',
  styleUrl: './category-selector.scss',
  templateUrl: './category-selector.html',
})
export class CategorySelector<T = string> {
  @Input({ required: true })
  public options: SelectOption<T>[] = [];

  @Input()
  public selected!: T;

  @Output()
  public selectedChange = new EventEmitter<T>();

  public select(value: T): void {
    this.selectedChange.emit(value);
  }
}
