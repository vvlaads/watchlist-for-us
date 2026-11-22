import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../interfaces/Page';
import { Movie } from '../interfaces/Movie';
import { AuthService } from './auth-service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly apiUrl = '/api/movies';

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getMovieById(uuid: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.apiUrl}/${uuid}`)
    }

    public getMovies(page: number, size: number, search = '') {
        return this.http.get<Page<Movie>>(`${this.apiUrl}/popular`, {
            params: { page, size, search }
        });
    }

    public getPopularMovies(page: number, size: number, search = '') {
        return this.http.get<Page<Movie>>(`${this.apiUrl}/popular`, {
            params: { page, size, search }
        });
    }

    public getRecommendedMovies(page: number, size: number, search = '') {
        return this.http.get<Page<Movie>>(`${this.apiUrl}/recommended`, {
            params: { page, size, search }
        });
    }

    public addMovie(movie: object, poster: File | null) {
        const formData = new FormData();

        formData.append(
            'movie',
            new Blob([JSON.stringify(movie)], {
                type: 'application/json'
            })
        );

        if (poster) {
            formData.append('poster', poster);
        }

        return this.authService.getCsrfToken().pipe(
            switchMap(() => this.http.post(`${this.apiUrl}`, formData))
        );
    }

    public setMovieRating(movieId: string, rating: number) {
        return this.authService.getCsrfToken().pipe(
            switchMap(() => this.http.put(
                `/api/movies/${movieId}/rating`,
                { rating }
            ))
        );
    }

    public updateMovie(movieId: string, movie: object, poster: File | null) {
        const formData = new FormData();

        formData.append(
            'movie',
            new Blob([JSON.stringify(movie)], {
                type: 'application/json'
            })
        );

        if (poster) {
            formData.append('poster', poster);
        }

        return this.authService.getCsrfToken().pipe(
            switchMap(() => this.http.put(`${this.apiUrl}/${movieId}`, formData))
        );
    }
}