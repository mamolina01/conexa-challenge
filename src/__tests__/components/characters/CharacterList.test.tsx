import { mockCharactersArray } from "@/__mocks__/character"
import { CharacterList } from "@/components/characters"
import { render } from "@testing-library/react"

describe('CharacterList Component', () => {

    it('renders the character name', () => {
        const { getByText } = render(<CharacterList characters={mockCharactersArray} />)

        mockCharactersArray.forEach(character => {
            expect(getByText(character.name)).toBeInTheDocument();
        });
    })

    it('renders the characters selectors', () => {
        const { getByText } = render(<CharacterList characters={mockCharactersArray} />)

        expect(getByText('Character #1')).toBeInTheDocument();
        expect(getByText('Character #2')).toBeInTheDocument();
    })
})