import { Component } from '@angular/core';
import { User } from '../../interfaces/User';

@Component({
  imports: [],
  selector: 'app-friends-page',
  styleUrl: './friends-page.scss',
  templateUrl: './friends-page.html',
})
export class FriendsPage {
  public friends: User[] = []
}
