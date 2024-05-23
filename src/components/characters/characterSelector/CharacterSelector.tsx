import { LuPointer } from 'react-icons/lu'
import styles from './CharacterSelector.module.scss'
import { Character } from '@/interfaces'
import { IoCloseSharp } from 'react-icons/io5'
import { getShortText } from '@/utils'

interface Props {
    handleSelector: (selector: number) => void
    removeSelectedCharacter: (selector: number) => void
    selectorActive: number
    character: {
        number: number
        data: Character | null
    }
}

export const CharacterSelector = ({ handleSelector, removeSelectedCharacter, selectorActive, character }: Props) => {
    const getClassName = () => {
        if (character.number === 1) {
            return styles.characterOne
        } else if (character.number === 2) {
            return styles.characterTwo
        }
    }
    return (
        <div className={`${styles.selectorContainer} ${getClassName()}`}>
            <p className={`${styles.text} ${getClassName()}`}>Character #{character.number}</p>
            {character.data ? (
                <button className={`${styles.button} ${getClassName()}`} onClick={() => removeSelectedCharacter(character.number)}>
                    <span>{getShortText(character.data.name, 17)}</span>
                    <IoCloseSharp className='text-xl' />
                </button>
            ) : (
                <button
                    onClick={() => handleSelector(character.number)}
                    className={`${styles.button} ${getClassName()} ${selectorActive === character.number ? styles.active : ''}`}>
                    <LuPointer />
                    <span>Choose one...</span>
                </button>
            )
            }
        </div>
    )
}
