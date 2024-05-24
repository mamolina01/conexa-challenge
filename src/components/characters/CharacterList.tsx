import { CharacterItem } from './characterSelector/CharacterItem'
import { Character } from '@/interfaces'
import { CharacterSelector } from './characterSelector/CharacterSelector'
interface Props {
    characters: Character[]
}

export const CharacterList = ({
    characters
}: Props) => {
    return (
        <>
            <div className='flex flex-col sm:flex-row justify-between gap-3 w-full'>
                <CharacterSelector characterNumber={1} />
                <CharacterSelector characterNumber={2} />
            </div>
            <div className='grid grid-cols-1 mt-6 max-h-[520px] overflow-scroll md:max-h-full md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 items-center rounded-xl'>
                {characters.map((character: Character) => (
                    <CharacterItem character={character} key={character.id} />
                ))}
            </div>
        </>
    )
}
