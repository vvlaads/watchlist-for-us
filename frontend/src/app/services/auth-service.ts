import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { LoginRequest, RegisterRequest } from '../interfaces/auth';
import { switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apiUrl = '/api/auth';

    constructor(private http: HttpClient) { }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`);
    }

    register(request: RegisterRequest): Observable<User> {
        return this.getCsrfToken().pipe(
            switchMap(() =>
                this.http.post<User>(`${this.apiUrl}/register`, request)
            )
        );
    }

    login(request: LoginRequest): Observable<User> {
        return this.getCsrfToken().pipe(
            switchMap(() =>
                this.http.post<User>(`${this.apiUrl}/login`, request)
            )
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/logout`, {});
    }

    getCsrfToken() {
        return this.http.get('/api/auth/csrf');
    }
}