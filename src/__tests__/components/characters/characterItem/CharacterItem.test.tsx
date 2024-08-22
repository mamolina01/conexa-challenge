import { render, screen, fireEvent } from '@testing-library/react'
import { useCharactersStore } from '@/store'
import { useCharacterSelector } from '@/hooks'
import { CharacterItem } from '@/components/characters/characterItem/CharacterItem'
import { Character } from '@/interfaces'
import styles from '@/components/characters/characterItem/CharacterItem.module.scss'

// Mocking Zustand store
jest.mock('../../../../store', () => ({
    useCharactersStore: jest.fn(),
}))

// Mocking the useCharacterSelector function
jest.mock('../../../../hooks', () => ({
    useCharacterSelector: jest.fn(),
}))

describe('CharacterItem Component', () => {
    const mockCharacter: Character = {
        "id": 2,
        "name": "Morty Smith",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
            "name": "Earth",
            "url": "https://rickandmortyapi.com/api/location/1"
        },
        "location": {
            "name": "Earth",
            "url": "https://rickandmortyapi.com/api/location/20"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            // ...
        ],
        "url": "https://rickandmortyapi.com/api/character/2",
        "created": new Date("2017-11-04T18:50:21.651Z")
    }

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


        expect(getByText('Morty Smith')).toBeInTheDocument()
        expect(getByText('Alive')).toBeInTheDocument()
        expect(getByText('Human')).toBeInTheDocument()
    })

    it('calls selectCharacter when the card is clicked', () => {
        const { getByRole } = render(<CharacterItem character={mockCharacter} />)

        const card = getByRole('button')
        fireEvent.click(card)

        expect(mockSelectCharacter).toHaveBeenCalledWith(mockCharacter)
    })

    it('applies the correct class for the character status', () => {
        const { getByText } = render(<CharacterItem character={mockCharacter} />)

        const statusElement = getByText('Alive')
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