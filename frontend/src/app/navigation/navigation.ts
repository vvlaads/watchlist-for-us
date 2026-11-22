import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { NAVIGATION_ITEMS } from '../constants/navigation-items';
import { APP_ROUTES } from '../constants/app-routes';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navigation',
  styleUrl: './navigation.scss',
  templateUrl: './navigation.html',
})
export class Navigation {
  readonly navigationItems = NAVIGATION_ITEMS;
  readonly routes = APP_ROUTES;

  constructor(public authService: AuthService) { }
}
