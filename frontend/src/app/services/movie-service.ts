import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../interfaces/Page';
import { Movie } from '../interfaces/Movie';
import { AuthService } from './auth-service';
import { Observable, switchMap } from 'rxjs';
import { MovieQueryParams } from '../interfaces/MovieQueryParams';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly apiUrl = '/api/movies';

    constructor(private http: HttpClient, private authService: AuthService) { }

    public getMovieById(uuid: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.apiUrl}/${uuid}`)
    }

    public getMovies(params: MovieQueryParams): Observable<Page<Movie>> {
        let httpParams = new HttpParams();

        if (params.search) {
            httpParams = httpParams.set('search', params.search);
        }

        if (params.type) {
            httpParams = httpParams.set('type', params.type);
        }

        if (params.genres?.length) {
            httpParams = httpParams.set('genres', params.genres.join(','));
        }

        if (params.sortBy) {
            httpParams = httpParams.set('sortBy', params.sortBy);
        }

        if (params.sortDirection) {
            httpParams = httpParams.set('sortDirection', params.sortDirection);
        }

        httpParams = httpParams
            .set('page', params.page ?? 0)
            .set('size', params.size ?? 20);

        return this.http.get<Page<Movie>>(this.apiUrl, {
            params: httpParams
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