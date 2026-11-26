import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";
import { Observable, switchMap } from "rxjs";
import { MovieListType } from "../interfaces/MovieListType";
import { Movie } from "../interfaces/Movie";
import { Page } from "../interfaces/Page";
import { MovieListQueryParams } from "../interfaces/MovieListQueryParams";

@Injectable({
    providedIn: 'root'
})
export class MovieListService {
    private readonly apiUrl = '/api/lists';

    constructor(private http: HttpClient, private authService: AuthService) { }

    public addMovieToList(movieId: string, listType: MovieListType) {

        return this.authService.getCsrfToken().pipe(
            switchMap(() => this.http.post(`${this.apiUrl}`, { movieId: movieId, listType: listType }))
        );
    }

    public getMoviesInList(params: MovieListQueryParams): Observable<Page<Movie>> {
        let httpParams = new HttpParams();

        if (params.listType) {
            httpParams = httpParams.set('listType', params.listType);
        }

        if (params.search) {
            httpParams = httpParams.set('search', params.search);
        }

        httpParams = httpParams
            .set('page', params.page ?? 0)
            .set('size', params.size ?? 20);

        return this.authService.getCsrfToken().pipe(
            switchMap(() => this.http.get<Page<Movie>>(this.apiUrl, { params: httpParams }))
        );
    }
}