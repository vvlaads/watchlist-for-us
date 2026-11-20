import { MovieType } from "../interfaces/MovieType";

export const MOVIE_TYPE_STYLES: Record<MovieType,
    {
        label: string;
        color: string;
        backgroundColor: string
    }> = {
    [MovieType.ANIME]: {
        label: 'Аниме',
        color: '#6941A5',
        backgroundColor: '#F0E7FF'
    },
    [MovieType.FILM]: {
        label: 'Фильм',
        color: '#246B55',
        backgroundColor: '#DDF7EC'
    },
    [MovieType.CARTOON]: {
        label: 'Мультфильм',
        color: '#946214',
        backgroundColor: '#FFF0CE'
    }
};