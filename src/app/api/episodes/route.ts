import { fetchEpisodes } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const characterId = request.nextUrl.searchParams.get("characterId") ?? ''

    try {
        const episodes = await fetchEpisodes(characterId)

        return NextResponse.json({ episodes })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            apiMessage: { errorMsg: "Internal Server Error, Please try again later" },
        });
    }
}