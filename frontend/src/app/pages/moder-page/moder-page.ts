import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-moder-page',
  styleUrl: './moder-page.scss',
  templateUrl: './moder-page.html',
})
export class ModerPage {
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  movieForm;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService
  ) {
    this.movieForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      type: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    this.selectedFile = file;

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }

    this.previewUrl = URL.createObjectURL(file);
  }

  submit(): void {
    if (this.movieForm.invalid) return;

    this.movieService.addMovie(
      this.movieForm.getRawValue(),
      this.selectedFile
    ).subscribe({
      next: (response) => {
        console.log('Фильм добавлен', response);
        this.movieForm.reset();
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('Ошибка добавления фильма', error);
      }
    });
  }
}