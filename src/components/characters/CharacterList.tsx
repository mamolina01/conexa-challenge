"use client"
import { CharacterItem } from './CharacterItem'
import { Character } from '@/interfaces'
import { useState } from 'react'
import { CharacterSelector } from './characterSelector/CharacterSelector'
import styles from './CharacterItem.module.scss'

interface Props {
    characters: Character[]
}

export const CharacterList = ({ characters }: Props) => {
    const [selectorActive, setSelectorActive] = useState<number>(0)

    const [characterOne, setCharacterOne] = useState<Character | null>(null)
    const [characterTwo, setCharacterTwo] = useState<Character | null>(null)

    const handleSelector = (selector: number) => {
        if (selector === selectorActive) {
            setSelectorActive(0)
        } else {
            setSelectorActive(selector)
        }
    }

    const selectCharacter = (character: Character) => {

        if (selectorActive === 1) {
            setCharacterOne(character)
            setSelectorActive(0)
        } else if (selectorActive === 2) {
            setCharacterTwo(character)
            setSelectorActive(0)
        }
    }

    const getSelectedCharacter = (character: Character) => {
        if (character.id === characterOne?.id) {
            return styles.activeCharacterOne
        } else if (character.id === characterTwo?.id) {
            return styles.activeCharacterTwo
        }

        return ''
    }

    return (
        <>
            <CharacterSelector handleSelector={handleSelector} selectorActive={selectorActive} />
            <div className='mt-6 flex flex-col gap-5'>
                <div className='grid grid-cols-4 gap-4 items-center'>
                    {characters.map((character: Character) => (
                        <CharacterItem character={character} key={character.id} selectCharacter={selectCharacter} selectedClassName={getSelectedCharacter(character)} />
                    ))}
                </div>

            </div>
        </>
    )
}
