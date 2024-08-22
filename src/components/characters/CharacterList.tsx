import { CharacterItem } from './characterItem/CharacterItem'
import { Character } from '@/interfaces'
import { CharacterSelector } from './characterSelector/CharacterSelector'
import styles from './CharacterList.module.scss'
interface Props {
    characters: Character[]
}

export const CharacterList = ({
    characters
}: Props) => {
    return (
        <>
            <div className={styles.selectors}>
                <CharacterSelector characterNumber={1} />
                <CharacterSelector characterNumber={2} />
            </div>
            <div className={styles.charactersContainer}>
                <div className={styles.characterList}>
                    {characters.map((character: Character) => (
                        <CharacterItem character={character} key={character.id} />
                    ))}
                </div>
            </div>
        </>
    )
}
