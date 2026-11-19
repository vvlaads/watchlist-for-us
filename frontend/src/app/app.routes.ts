import { Routes } from '@angular/router';
import { ModerPage } from './pages/moder-page/moder-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { RecommendationsPage } from './pages/recommendations-page/recommendations-page';
import { TogetherPage } from './pages/together-page/together-page';
import { PopularPage } from './pages/popular-page/popular-page';
import { FriendsPage } from './pages/friends-page/friends-page';

export const routes: Routes = [
    {
        path: '',
        component: RecommendationsPage
    },
    {
        path: 'together',
        component: TogetherPage
    },
    {
        path: 'popular',
        component: PopularPage
    },
    {
        path: 'moder',
        component: ModerPage
    },
    {
        path: 'users/:id/friends',
        component: FriendsPage
    },
    {
        path: 'users/:id',
        component: ProfilePage
    },
];
