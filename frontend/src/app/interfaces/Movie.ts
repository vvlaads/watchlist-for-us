import { MovieType } from "./MovieType";

export interface Movie {
    uuid: string;
    name: string;
    description: string;
    type: MovieType;
    posterKey: string;
    averageRating: number;
    ratingCount: number;
}