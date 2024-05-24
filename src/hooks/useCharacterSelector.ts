import { Character } from "@/interfaces"
import { useCharactersStore } from "@/store"

export const useCharacterSelector = () => {

    const { selectorActive, characterOne, characterTwo, setSelectorActive, setCharacterOne, setCharacterTwo } = useCharactersStore(state => state)


    const handleSelector = (selector: number) => {
        if (selector === selectorActive) {
            setSelectorActive(0)
        } else {
            setSelectorActive(selector)
        }
    }

    const selectCharacter = (character: Character) => {
        if (character !== characterOne && character !== characterTwo) {
            if (selectorActive === 1) {
                setCharacterOne(character)
                setSelectorActive(0)
            } else if (selectorActive === 2) {
                setCharacterTwo(character)
                setSelectorActive(0)
            }
        }
    }

    const removeSelectedCharacter = (value: number) => {
        if (value === 1) {
            setCharacterOne(null)
            setSelectorActive(0)
        } else if (value === 2) {
            setCharacterTwo(null)
            setSelectorActive(0)
        }
    }

    return {
        handleSelector,
        selectCharacter,
        removeSelectedCharacter
    }
}