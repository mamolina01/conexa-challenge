import { CharacterItem } from './CharacterItem'
import { Character } from '@/interfaces'

interface Props {
    characters: Character[]
}

export const CharacterList = async ({ characters }: Props) => {

    return (
        <>
            <div className='flex w-full justify-between'>
                <p className='text-neutral-900 font-bold text-2xl'>Character #1</p>
                <p className='text-neutral-900 font-bold text-2xl'>Character #2</p>
            </div>
            <div className='mt-6 flex flex-col gap-5'>
                <div className='grid grid-cols-4 gap-4 items-center'>
                    {characters.map((character: Character) => (
                        <CharacterItem character={character} key={character.id} />
                    ))}
                </div>

            </div>
        </>
    )
}
