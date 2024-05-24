"use client"
import Image from 'next/image'
import styles from './CharacterItem.module.scss'
import { Character } from '@/interfaces'
import { getShortText } from '@/utils'
import { useCharactersStore } from '@/store'
import { useCharacterSelector } from '@/hooks'

interface Props {
    character: Character
}

export const CharacterItem = ({ character }: Props) => {

    const { selectorActive, characterOne, characterTwo } = useCharactersStore(state => state)
    const { selectCharacter } = useCharacterSelector()

    const getStatusClass = () => {
        switch (character.status.toLowerCase()) {
            case 'alive':
                return styles.alive
            case 'dead':
                return styles.dead
        }
    }

    const getSelectedClassName = () => {
        if (character.id === characterOne?.id) {
            return styles.characterOneSelected
        } else if (character.id === characterTwo?.id) {
            return styles.characterTwoSelected
        }

        return ''
    }

    const isSelectorActive = selectorActive !== 0

    return (
        <div className={`${styles.card} ${getSelectedClassName()} ${isSelectorActive ? styles.selectorActive : ''}`} onClick={() => selectCharacter(character)}>
            <div className={styles.imageContainer}>
                <Image
                    src={character.image}
                    alt={character.name}
                    className={styles.image}
                    fill
                />
            </div>
            <div className={styles.textContainer}>
                <p className={styles.name}>{getShortText(character.name, 17)}</p>
                <p className={`${styles.status} ${getStatusClass()}`}>{character.status}</p>
                <p className={styles.species}>{getShortText(character.species, 15)}</p>
            </div>
        </div>
    )
}
