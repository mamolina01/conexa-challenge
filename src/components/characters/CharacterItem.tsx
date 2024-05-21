import Image from 'next/image'
import styles from './CharacterItem.module.scss'
import { Character } from '@/interfaces'

interface Props {
    character: Character
    selectCharacter: (character: Character) => void
    isSelectedCharacter: boolean
}

export const CharacterItem = ({ character, selectCharacter, isSelectedCharacter }: Props) => {

    const getStatusClass = () => {
        switch (character.status.toLowerCase()) {
            case 'alive':
                return styles.alive
            case 'dead':
                return styles.dead
        }
    }

    const getName = () => {
        if (character.name.length < 17) {
            return character.name
        }
        return `${character.name.substring(0, 17).trim()}...`
    }

    return (
        <div className={`${styles.card} ${isSelectedCharacter ? styles.active : ''}`} onClick={() => selectCharacter(character)}>
            <div className={styles.imageContainer}>
                <Image
                    src={character.image}
                    alt={character.name}
                    className={styles.image}
                    fill
                />
            </div>
            <div className={styles.textContainer}>
                <p className={styles.name}>{getName()}</p>
                <p className={`${styles.status} ${getStatusClass()}`}>{character.status}</p>
                <p className={styles.species}>{character.species}</p>
            </div>
        </div >
    )
}
