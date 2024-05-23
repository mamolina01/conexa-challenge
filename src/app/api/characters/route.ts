import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const page = request.nextUrl.searchParams.get("page") ?? ''
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((data) => data.json())
            .then((response) => response);


        return NextResponse.json({ data })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            apiMessage: { errorMsg: "Internal Server Error, Please try again later" },
        });
    }
}