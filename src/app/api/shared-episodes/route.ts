import { Episode } from "@/interfaces";
import { fetchEpisodes } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const characterOneId = searchParams.get('characterOneId') ?? ''
        const characterTwoId = searchParams.get('characterTwoId') ?? ''

        const episodesCharacterOne = await fetchEpisodes(characterOneId)
        const episodesCharacterTwo = await fetchEpisodes(characterTwoId)

        const episodes = episodesCharacterOne.filter((episode1: Episode) => episodesCharacterTwo.some((episode2: Episode) => episode1.id === episode2.id));


        return NextResponse.json({ episodes })
    } catch (error) {
        console.log(error)
        // TODO: Check this response
        return NextResponse.json({ error: 'algo salio mal' })
    }
}