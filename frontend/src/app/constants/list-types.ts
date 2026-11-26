import { MovieListType } from "../interfaces/MovieListType";
import { ListTypeItem } from "../interfaces/ListTypeItem";

export const LIST_TYPES: ListTypeItem[] = [
    {
        listType: MovieListType.PLANNED,
        label: 'Хочу посмотреть',
    },
    {
        listType: MovieListType.WATCHING,
        label: 'Смотрю',
    },
    {
        listType: MovieListType.WATCHED,
        label: 'Просмотрено',
    },
    {
        listType: MovieListType.DROPPED,
        label: 'Брошено',
    },
]