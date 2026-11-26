import { MovieListType } from "./MovieListType";

export interface MovieListQueryParams {
    search?: string;

    listType?: MovieListType;

    page?: number;
    size?: number;
}