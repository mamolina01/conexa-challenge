"use client"
import { LuPointer } from 'react-icons/lu'
import styles from './CharacterSelector.module.scss'
import { Character } from '@/interfaces'
import { IoCloseSharp } from 'react-icons/io5'
import { getShortText } from '@/utils'
import { useCharacterSelector } from '@/hooks'
import { useCharactersStore } from '@/store'
import { useEffect, useState } from 'react'

interface Props {
    characterNumber: number
}

export const CharacterSelector = ({ characterNumber }: Props) => {
    const [character, setCharacter] = useState<Character | null>(null)
    const { handleSelector, removeSelectedCharacter } = useCharacterSelector()
    const { characterOne, characterTwo, selectorActive } = useCharactersStore(state => state)

    useEffect(() => {
        if (characterNumber === 1) {
            setCharacter(characterOne)
        } else if (characterNumber === 2) {
            setCharacter(characterTwo)
        }
    }, [characterOne, characterTwo, characterNumber])

    const getClassName = () => {
        if (characterNumber === 1) {
            return styles.characterOne
        } else if (characterNumber === 2) {
            return styles.characterTwo
        }
    }

    return (
        <div className={`${styles.selectorContainer} ${getClassName()}`}>
            <p className={`${styles.text} ${getClassName()}`}>Character #{characterNumber}</p>
            {character ? (
                <button className={`${styles.button} ${getClassName()}`} onClick={() => removeSelectedCharacter(characterNumber)}>
                    <span>{getShortText(character.name, 12)}</span>
                    <IoCloseSharp className='text-xl' />
                </button>
            ) : (
                <button
                    onClick={() => handleSelector(characterNumber)}
                    className={`${styles.button} ${getClassName()} ${selectorActive === characterNumber ? styles.active : ''}`}>
                    <LuPointer />
                    <span>Choose one...</span>
                </button>
            )
            }
        </div>
    )
}
