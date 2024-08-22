import { render, screen, fireEvent } from '@testing-library/react'
import { useCharactersStore } from '@/store'
import { useCharacterSelector } from '@/hooks'
import { CharacterItem } from '@/components/characters/characterItem/CharacterItem'
import styles from '@/components/characters/characterItem/CharacterItem.module.scss'
import { mockCharacter } from '@/__mocks__/character'

// Mocking Zustand store
jest.mock('../../../../store', () => ({
    useCharactersStore: jest.fn(),
}))

// Mocking the useCharacterSelector function
jest.mock('../../../../hooks', () => ({
    useCharacterSelector: jest.fn(),
}))

describe('CharacterItem Component', () => {

    const mockSelectCharacter = jest.fn()

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

    it('renders the character name, status, and species', () => {
        const { getByText } = render(<CharacterItem character={mockCharacter} />)


        expect(getByText(mockCharacter.name)).toBeInTheDocument()
        expect(getByText(mockCharacter.status)).toBeInTheDocument()
        expect(getByText(mockCharacter.species)).toBeInTheDocument()
    })

    it('calls selectCharacter when the card is clicked', () => {
        const { getByRole } = render(<CharacterItem character={mockCharacter} />)

        const card = getByRole('button')
        fireEvent.click(card)

        expect(mockSelectCharacter).toHaveBeenCalledWith(mockCharacter)
    })

    it('applies the correct class for the character status', () => {
        const { getByText } = render(<CharacterItem character={mockCharacter} />)

        const statusElement = getByText(mockCharacter.status)
        expect(statusElement).toHaveClass(styles.alive)
    })

    it('applies the selected class when the character is selected', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 1,
            characterOne: mockCharacter,
            characterTwo: null,
        })

        render(<CharacterItem character={mockCharacter} />)

        const card = screen.getByRole('button')
        expect(card).toHaveClass(styles.characterOneSelected)
    })
})