import { Component } from '@angular/core';
import { SelectOption } from '../../interfaces/SelectiOption';
import { CategorySelector } from '../../shared/components/category-selector/category-selector';

@Component({
  imports: [CategorySelector],
  selector: 'app-my-library-page',
  styleUrl: './my-library-page.scss',
  templateUrl: './my-library-page.html',
})
export class MyLibraryPage {
  public selectedStatus = 'ALL';

  public listStatuses: SelectOption[] = [
    { value: 'ALL', label: 'Все' },
    { value: 'PLANNED', label: 'Хочу посмотреть' },
    { value: 'WATCHING', label: 'Смотрю' },
    { value: 'COMPLETED', label: 'Просмотрено' },
    { value: 'DROPPED', label: 'Брошено' }
  ];
}
