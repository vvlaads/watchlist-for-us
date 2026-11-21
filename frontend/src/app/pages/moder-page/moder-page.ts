import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie-service';
import { Genre } from '../../interfaces/Genre';
import { GENRE_LABELS } from '../../utils/genres';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-moder-page',
  styleUrl: './moder-page.scss',
  templateUrl: './moder-page.html',
})
export class ModerPage {
  public selectedFile: File | null = null;
  public previewUrl: string | null = null;

  public movieForm;

  readonly genreLabels = GENRE_LABELS;

  readonly genres = Object.entries(GENRE_LABELS).map(([value, label]) => ({
    value: value as Genre,
    label
  }));

  constructor(private fb: FormBuilder, private movieService: MovieService) {
    this.movieForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      type: ['', Validators.required],
      genres: this.fb.nonNullable.control<Genre[]>([], Validators.required),
      primaryGenre: this.fb.control<Genre | null>(null, Validators.required),
      releaseYear: this.fb.control<number | null>(null, [Validators.min(1888), Validators.max(2100)]),
    });
  }

  public onFileSelected(event: Event): void {
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

  get selectedGenres() {
    const selected = this.movieForm.controls.genres.value;

    return Object.entries(GENRE_LABELS)
      .filter(([genre]) => selected.includes(genre as Genre))
      .map(([value, label]) => ({
        value: value as Genre,
        label
      }));
  }

  toggleGenre(genre: Genre, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const currentGenres = this.movieForm.controls.genres.value;

    const updatedGenres = checkbox.checked
      ? [...currentGenres, genre]
      : currentGenres.filter(item => item !== genre);

    this.movieForm.controls.genres.setValue(updatedGenres);

    if (!updatedGenres.includes(this.movieForm.controls.primaryGenre.value as Genre)) {
      this.movieForm.controls.primaryGenre.setValue(updatedGenres[0] ?? null);
    }
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