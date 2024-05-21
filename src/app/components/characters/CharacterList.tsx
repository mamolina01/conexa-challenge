import { getCharacters } from '@/actions/get-characters'
import React from 'react'
import { CharacterItem } from './CharacterItem'

interface Props {
    subtitle: string
}

export const CharacterList = async ({ subtitle }: Props) => {
    const { ok, data } = await getCharacters()

    if (!ok) {
        return <p>Hubo un error</p>
    }

    return (
        <div className='mt-6 flex flex-col gap-5'>
            <h6 className='text-xl'>{subtitle}</h6>
            <div className='grid grid-cols-3 gap-5 px-5 items-center h-[600px] overflow-scroll'>
                {data?.results.map((character: any) => (
                    <CharacterItem character={character} key={character.id} />
                ))}
            </div>
        </div>
    )
}
