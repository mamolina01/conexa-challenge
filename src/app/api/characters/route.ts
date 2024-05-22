import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1'

        console.log(page)
        const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((data) => data.json())
            .then((response) => response);


        return NextResponse.json({ data })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'algo salio mal' })
    }
}