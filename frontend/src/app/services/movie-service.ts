import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../interfaces/Page';
import { Movie } from '../interfaces/Movie';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly apiUrl = '/api/movies';

    constructor(private http: HttpClient) { }

    public getPopularMovies(page: number, size: number) {
        return this.http.get<Page<Movie>>(`${this.apiUrl}/popular`, {
            params: { page, size }
        });
    }

    public getRecommendedMovies(page: number, size: number) {
        return this.http.get<Page<Movie>>(`${this.apiUrl}/recommended`, {
            params: { page, size }
        });
    }

}
