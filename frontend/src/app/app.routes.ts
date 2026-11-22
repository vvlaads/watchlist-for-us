import { Routes } from '@angular/router';
import { ProfilePage } from './pages/profile-page/profile-page';
import { TogetherPage } from './pages/together-page/together-page';
import { FriendsPage } from './pages/friends-page/friends-page';
import { Auth } from './pages/auth/auth';
import { MoviePage } from './pages/movie-page/movie-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { ModerationMoviesPage } from './pages/moderation/moderation-movies-page/moderation-movies-page';
import { MovieCreatePage } from './pages/moderation/movie-create-page/movie-create-page';
import { MovieEditPage } from './pages/moderation/movie-edit-page/movie-edit-page';
import { authGuard } from './security/auth.guard';
import { MyLibraryPage } from './pages/my-library-page/my-library-page';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth
    },
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: 'catalog',
        component: CatalogPage
    },
    {
        path: 'my-library',
        component: MyLibraryPage
    },
    {
        path: 'together',
        component: TogetherPage,
        canActivate: [authGuard]
    },
    {
        path: 'movies/:id',
        component: MoviePage
    },
    {
        path: 'friends',
        component: FriendsPage,
        canActivate: [authGuard]
    },
    {
        path: 'profile/:userId',
        component: ProfilePage,
        canActivate: [authGuard]
    },
    {
        path: 'moderation',
        children: [
            {
                path: '',
                redirectTo: 'movies',
                pathMatch: 'full'
            },
            {
                path: 'movies',
                component: ModerationMoviesPage
            },
            {
                path: 'movies/new',
                component: MovieCreatePage
            },
            {
                path: 'movies/:id',
                component: MovieEditPage
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'catalog'
    },
];
