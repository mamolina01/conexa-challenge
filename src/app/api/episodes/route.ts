import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id') || ''

        const { episode: episodes } = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((data) => data.json())
            .then((response) => response);

        const formatedEpisodes = await Promise.all(episodes.map(async (episodeUrl: string) => {
            const episode = await fetch(episodeUrl).then(response => response.json());
            return {
                id: episode.id,
                name: episode.name,
                date: episode.air_date
            };
        }));

        return NextResponse.json({ episodes: formatedEpisodes })
    } catch (error) {
        console.log(error)
        // TODO: Check this response
        return NextResponse.json({ error: 'algo salio mal' })
    }
}