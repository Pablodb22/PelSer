export interface IPelicula {
    id: number;
    poster_path: string;
    title: string;
    release_date: number | string;
    vote_average: number | string;
    genre_ids: number[];
    overview: string;
}