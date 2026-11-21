import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-modal',
  styleUrl: './modal.scss',
  templateUrl: './modal.html',
})
export class Modal {
  closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
