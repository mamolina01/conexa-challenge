import { CharacterSelector } from "@/components/characters/characterSelector/CharacterSelector"
import { render, waitFor } from '@testing-library/react'
import { useCharactersStore } from '@/store'
import { useCharacterSelector } from '@/hooks'
import { mockCharacter } from "@/__mocks__/character"
import styles from './CharacterSelector.module.scss'

// Mocking Zustand store
jest.mock('../../../../store', () => ({
    useCharactersStore: jest.fn(),
}))

// Mocking the useCharacterSelector function
jest.mock('../../../../hooks', () => ({
    useCharacterSelector: jest.fn(),
}))

const mockSelectCharacter = jest.fn()


describe('CharacterSelector Component', () => {

    beforeEach(() => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 1,
            characterOne: null,
            characterTwo: null,
        });

        // Mock the useCharacterSelector function's return value
        (useCharacterSelector as unknown as jest.Mock).mockReturnValue({
            selectCharacter: mockSelectCharacter,
            handleSelector: jest.fn(),
            removeSelectedCharacter: jest.fn(),
        })
    })

    it('renders the character number', () => {
        const { getByText } = render(<CharacterSelector characterNumber={1} />)
        const name = getByText('Character #1')
        expect(name).toBeTruthy()
    })

    it('renders "Choose one..." when no character is selected', () => {
        const { getByText } = render(<CharacterSelector characterNumber={1} />)
        const chooseOne = getByText('Choose one...')
        expect(chooseOne).toBeTruthy()
    })

    it('renders character name when a character is selected', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 0,
            characterOne: mockCharacter,
            characterTwo: null,
        });
        const { getByText } = render(<CharacterSelector characterNumber={1} />)
        const characterName = getByText(mockCharacter.name)

        expect(characterName).toBeTruthy()
    })

    it('applies the correct styles for the character number', () => {
        const { getByText } = render(<CharacterSelector characterNumber={1} />)

        const container = getByText('Character #1').closest('div')
        expect(container).toHaveClass(styles.selectorContainer)
        expect(container).toHaveClass(styles.characterOne)

        // Test for character number 2
        render(<CharacterSelector characterNumber={2} />)
        const containerTwo = getByText('Character #2').closest('div')
        expect(containerTwo).toHaveClass(styles.characterTwo)
    })


})