import { NavigationItem } from '../interfaces/navigation-item';
import { APP_ROUTES } from './app-routes';

export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        label: 'Каталог',
        route: APP_ROUTES.CATALOG,
        icon: 'Book.svg'
    },
    {
        label: 'Вместе',
        route: APP_ROUTES.TOGETHER,
        icon: 'Users.svg'
    },
    {
        label: 'Мои списки',
        route: APP_ROUTES.MY_LIBRARY,
        icon: 'Bookmark.svg'
    },
    {
        label: 'Управление каталогом',
        route: APP_ROUTES.MODERATION,
        icon: 'Tool.svg',
        moderatorOnly: true
    }
];