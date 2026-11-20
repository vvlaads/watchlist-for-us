import { Component } from '@angular/core';
import { User } from '../../interfaces/User';

@Component({
  imports: [],
  selector: 'app-together-page',
  styleUrl: './together-page.scss',
  templateUrl: './together-page.html',
})
export class TogetherPage {
  public friends: User[] = [];
}
