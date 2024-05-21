"use server"

import { GetCharactersResponse } from "@/interfaces";


export const getCharacters = async (): Promise<GetCharactersResponse> => {
    try {
        const data = await fetch("https://rickandmortyapi.com/api/character")
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