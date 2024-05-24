"use server"
import { GetCharactersResponse } from "@/interfaces";


export const getCharacters = async (page: number = 1): Promise<GetCharactersResponse> => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((data) => data.json())
            .then((response) => response);

        return {
            ok: true,
            data: data
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            data: null
        }
    }
}