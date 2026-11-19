import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PosterService {
    private readonly apiUrl = '/api/posters';

    constructor(private http: HttpClient) { }

    upload(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.apiUrl, formData, {
            responseType: 'text'
        });
    }

    getPosterUrl(key: string): string {
        return `${this.apiUrl}/${key}`;
    }
}
