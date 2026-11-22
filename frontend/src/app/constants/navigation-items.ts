import { NavigationItem } from '../interfaces/navigation-item';
import { APP_ROUTES } from './app-routes';

export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        label: 'Для тебя',
        route: APP_ROUTES.FOR_YOU,
        icon: 'Star.svg',
        exact: true
    },
    {
        label: 'Вместе',
        route: APP_ROUTES.TOGETHER,
        icon: 'Users.svg'
    },
    {
        label: 'Популярное',
        route: APP_ROUTES.POPULAR,
        icon: 'Trending up.svg'
    },
    {
        label: 'Каталог',
        route: APP_ROUTES.CATALOG,
        icon: 'Library.svg'
    },
    {
        label: 'Управление каталогом',
        route: APP_ROUTES.MODERATION,
        icon: 'Settings.svg',
        moderatorOnly: true
    }
];