import { Injectable, signal } from '@angular/core';

export type AuthModalMode = 'login' | 'register';

@Injectable({
    providedIn: 'root'
})
export class AuthModalService {
    readonly mode = signal<AuthModalMode | null>(null);

    public open(mode: AuthModalMode = 'login'): void {
        this.mode.set(mode);
    }

    public close(): void {
        this.mode.set(null);
    }
}