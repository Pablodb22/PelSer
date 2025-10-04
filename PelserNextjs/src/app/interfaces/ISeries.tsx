export interface ISerie {
    id: number;
    backdrop_path: string;
    name: string;
    first_air_date: number | string;
    vote_average: number | string;
    genre_ids: number[];
}