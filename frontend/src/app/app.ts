import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { AuthService } from './services/auth-service';

@Component({
  imports: [RouterOutlet, Navigation],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.loadCurrentUser();
  }
}
