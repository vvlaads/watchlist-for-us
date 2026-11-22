import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../../services/movie-service';
import { Genre } from '../../../interfaces/Genre';
import { MOVIE_MAX_DESCRIPTION_LENGTH, MOVIE_MAX_NAME_LENGTH, MOVIE_MAX_RELEASE_YEAR, MOVIE_MIN_RELEASE_YEAR } from '../../../constants/movie';
import { GENRES } from '../../../constants/genres';
import { MOVIE_TYPES } from '../../../constants/movie-types';
import { GenreSelector } from '../genre-selector/genre-selector';
import { GenreOption } from '../../../interfaces/GenreOption';
import { Router } from '@angular/router';
import { Movie } from '../../../interfaces/Movie';
import { PosterService } from '../../../services/poster-service';

@Component({
  imports: [ReactiveFormsModule, GenreSelector],
  selector: 'app-movie-form',
  styleUrl: './movie-form.scss',
  templateUrl: './movie-form.html',
})
export class MovieForm implements OnDestroy {
  public movieForm: FormGroup;

  public selectedFile: File | null = null;
  private previewUrl: string | null = null;
  private previewObjectUrl: string | null = null;
  public isDragging = false;

  public genres = GENRES;
  public movieTypes = MOVIE_TYPES;

  public currentMovie: Movie | null = null;

  @Input()
  public set movie(value: Movie | null) {
    if (!value) return;

    this.currentMovie = value;

    this.movieForm.patchValue({
      name: value.name,
      description: value.description,
      type: value.type,
      genres: value.genres,
      primaryGenre: value.primaryGenre,
      releaseYear: value.releaseYear
    });

    this.previewUrl = value.posterKey
      ? this.posterService.getPosterUrl(value.posterKey)
      : null;
  }

  constructor(private fb: FormBuilder, private movieService: MovieService, private posterService: PosterService, private router: Router) {
    this.movieForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(MOVIE_MAX_NAME_LENGTH)]],
      description: ['', [Validators.required, Validators.maxLength(MOVIE_MAX_DESCRIPTION_LENGTH)]],
      type: ['', Validators.required],
      genres: this.fb.nonNullable.control<Genre[]>([], Validators.required),
      primaryGenre: this.fb.control<Genre | null>(null, Validators.required),
      releaseYear: this.fb.control<number | null>(null, [Validators.min(MOVIE_MIN_RELEASE_YEAR), Validators.max(MOVIE_MAX_RELEASE_YEAR)]),
    });
  }

  public ngOnDestroy(): void {
    this.clearSelectedFile();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.setSelectedFile(file);
    }

    input.value = '';
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];

    if (file) {
      this.setSelectedFile(file);
    }
  }

  private setSelectedFile(file: File): void {
    if (!file.type.startsWith('image/')) return;

    this.selectedFile = file;

    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }

    this.previewObjectUrl = URL.createObjectURL(file);
    this.previewUrl = this.previewObjectUrl;
  }

  public clearSelectedFile(): void {
    this.selectedFile = null;

    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
      this.previewObjectUrl = null;
    }

    this.previewUrl = null;
  }

  public onGenresChange(genres: Genre[]): void {
    this.movieForm.controls['genres'].setValue(genres);

    const primaryGenre = this.movieForm.controls['primaryGenre'].value;

    if (!genres.includes(primaryGenre!)) {
      this.movieForm.controls['primaryGenre'].setValue(
        genres[0] ?? null
      );
    }
  }

  public get selectedGenres(): GenreOption[] {
    const selected = this.movieForm.controls['genres'].value as Genre[];

    return this.genres.filter(item => selected.includes(item.genre));
  }

  public submit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    if (this.currentMovie) {
      this.movieService.updateMovie(
        this.currentMovie.uuid,
        this.movieForm.getRawValue(),
        this.selectedFile
      ).subscribe({
        next: () => {
          this.router.navigate(['/moderation/movies']);
        },
        error: (error) => {
          console.error('Ошибка обновления фильма', error);
        }
      });
    } else {
      this.movieService.addMovie(
        this.movieForm.getRawValue(),
        this.selectedFile
      ).subscribe({
        next: () => {
          this.router.navigate(['/moderation/movies']);
        },
        error: (error) => {
          console.error('Ошибка добавления фильма', error);
        }
      });
    }
  }

  public cancel(): void {
    this.router.navigate(['/moderation/movies']);
  }
}
