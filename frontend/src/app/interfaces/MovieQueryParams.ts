import { Genre } from "./Genre";
import { MovieSort } from "./MovieSort";
import { MovieType } from "./MovieType";

export interface MovieQueryParams {
    search?: string;

    type?: MovieType;
    genres?: Genre[];

    sortBy?: MovieSort;
    sortDirection?: 'ASC' | 'DESC';

    page?: number;
    size?: number;
}