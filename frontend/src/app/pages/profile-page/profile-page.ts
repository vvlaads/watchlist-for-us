import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { User } from '../../interfaces/User';

@Component({
  imports: [],
  selector: 'app-profile-page',
  styleUrl: './profile-page.scss',
  templateUrl: './profile-page.html',
})
export class ProfilePage implements OnInit {
  constructor(private authService: AuthService) { }

  public user: User | null = null;

  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }
}
