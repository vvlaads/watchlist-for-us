import { Genre } from "./Genre";
import { MovieType } from "./MovieType";

export interface Movie {
    id: string;
    name: string;
    description: string;
    type: MovieType;
    posterKey: string;
    averageRating: number;
    ratingCount: number;
    genres: Set<Genre>;
    primaryGenre: Genre;
    releaseYear: number;
}