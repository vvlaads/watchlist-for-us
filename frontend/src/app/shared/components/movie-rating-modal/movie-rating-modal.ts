import { Component, input, output } from '@angular/core';
import { Modal } from '../modal/modal';

@Component({
  imports: [Modal],
  selector: 'app-movie-rating-modal',
  styleUrl: './movie-rating-modal.scss',
  templateUrl: './movie-rating-modal.html',
})
export class MovieRatingModal {
  movieId = input.required<string>();

  closed = output<void>();
  ratingSubmitted = output<number>();

  readonly ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  selectedRating: number | null = null;

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.selectedRating === null) return;

    console.log(this.selectedRating);
    this.ratingSubmitted.emit(this.selectedRating);
    this.close();
  }
}
