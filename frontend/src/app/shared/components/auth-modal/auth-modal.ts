import { Component, output } from '@angular/core';
import { Modal } from '../modal/modal';

@Component({
  imports: [Modal],
  selector: 'app-auth-modal',
  styleUrl: './auth-modal.scss',
  templateUrl: './auth-modal.html',
})
export class AuthModal {
  closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
