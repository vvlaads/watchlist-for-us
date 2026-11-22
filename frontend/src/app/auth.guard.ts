import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth-service';
import { AuthModalService } from './services/auth-modal-service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const authModalService = inject(AuthModalService);

    if (authService.currentUser()) {
        return true;
    }

    authModalService.open('login');
    return false;
};