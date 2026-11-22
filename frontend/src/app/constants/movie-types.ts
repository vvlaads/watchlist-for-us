import { MovieType } from "../interfaces/MovieType";
import { MovieTypeItem } from "../interfaces/MovieTypeItem";

export const MOVIE_TYPES: Map<MovieType, MovieTypeItem> = new Map([
    [
        MovieType.ANIME, {
            label: 'Аниме',
            color: '#6941A5',
            backgroundColor: '#F0E7FF'
        }
    ],
    [
        MovieType.FILM, {
            label: 'Фильм',
            color: '#246B55',
            backgroundColor: '#DDF7EC'
        }
    ],
    [
        MovieType.CARTOON, {
            label: 'Мультфильм',
            color: '#946214',
            backgroundColor: '#FFF0CE'
        }
    ],
]);

