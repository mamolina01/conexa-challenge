import { fetchEpisodes } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const characterId = searchParams.get('characterId') ?? ''

        const episodes = await fetchEpisodes(characterId)

        return NextResponse.json({ episodes })
    } catch (error) {
        console.log(error)
        // TODO: Check this response
        return NextResponse.json({ error: 'algo salio mal' })
    }
}