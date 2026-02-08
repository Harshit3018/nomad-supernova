export interface Movie {
    id: number;
    title: string;
    original_name?: string;
    name?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    media_type?: string;
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
}

export interface Trailer {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface Cast {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}

export interface Provider {
    link: string;
    flatrate?: {
        logo_path: string;
        provider_name: string;
        display_priority: number;
    }[];
    buy?: {
        logo_path: string;
        provider_name: string;
        display_priority: number;
    }[];
    rent?: {
        logo_path: string;
        provider_name: string;
        display_priority: number;
    }[];
}

export interface Availability {
    netflixUrl?: string;
    primeUrl?: string;
    mxPlayerUrl?: string;
    externalFreeUrl?: string;
    isFree?: boolean;
}
