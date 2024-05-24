import { Character } from '@/interfaces'
import { create } from 'zustand'

interface State {
    characterOne: Character | null
    characterTwo: Character | null
    selectorActive: number
    setCharacterOne: (character: Character | null) => void
    setCharacterTwo: (character: Character | null) => void
    setSelectorActive: (number: number) => void
}

export const useCharactersStore = create<State>()(set => ({
    characterOne: null,
    characterTwo: null,
    selectorActive: 0,

    setCharacterOne: character => {
        set({ characterOne: character })
    },
    setCharacterTwo: character => {
        set({ characterTwo: character })
    },
    setSelectorActive: number => {
        set({ selectorActive: number })
    }
}))
