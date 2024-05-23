import { Episode } from "@/interfaces";
import { fetchEpisodes } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const characterOneId = request.nextUrl.searchParams.get("characterOneId") ?? ''
    const characterTwoId = request.nextUrl.searchParams.get("characterTwoId") ?? ''

    try {
        const episodesCharacterOne = await fetchEpisodes(characterOneId)
        const episodesCharacterTwo = await fetchEpisodes(characterTwoId)

        const episodes = episodesCharacterOne.filter((episode1: Episode) => episodesCharacterTwo.some((episode2: Episode) => episode1.id === episode2.id));

        return NextResponse.json({ episodes })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            apiMessage: { errorMsg: "Internal Server Error, Please try again later" },
        });
    }
}