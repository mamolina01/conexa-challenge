export interface ApiResponse {
    info: Info;
    results: Character[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}

export interface Episode {
    id: number;
    name: string;
    date: string;
}

export interface Location {
    name: string;
    url: string;
}


export interface GetCharactersResponse {
    ok: boolean;
    data: ApiResponse | null;
}