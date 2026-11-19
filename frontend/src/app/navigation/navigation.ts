import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navigation',
  styleUrl: './navigation.scss',
  templateUrl: './navigation.html',
})
export class Navigation {
  readonly authService = inject(AuthService);
}
