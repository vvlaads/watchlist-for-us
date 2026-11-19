import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/User';
import { LoginRequest, RegisterRequest } from '../interfaces/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = '/api/auth';

    readonly currentUser = signal<User | null>(null);

    constructor(private http: HttpClient) { }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`);
    }

    loadCurrentUser(): void {
        this.getCurrentUser().pipe(
            tap(user => this.currentUser.set(user)),
            catchError(() => {
                this.currentUser.set(null);
                return of(null);
            })
        ).subscribe();
    }

    login(request: LoginRequest): Observable<User> {
        return this.getCsrfToken().pipe(
            switchMap(() => this.http.post<User>(`${this.apiUrl}/login`, request)),
            tap(user => this.currentUser.set(user))
        );
    }

    register(request: RegisterRequest): Observable<User> {
        return this.getCsrfToken().pipe(
            switchMap(() => this.http.post<User>(`${this.apiUrl}/register`, request))
        );
    }

    logout(): Observable<void> {
        return this.getCsrfToken().pipe(
            switchMap(() => this.http.post<void>(`${this.apiUrl}/logout`, {})),
            tap(() => this.currentUser.set(null))
        );
    }

    getCsrfToken() {
        return this.http.get(`${this.apiUrl}/csrf`);
    }
}