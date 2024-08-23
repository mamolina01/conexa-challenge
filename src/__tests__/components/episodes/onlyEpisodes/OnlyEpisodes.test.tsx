import { mockCharacter } from "@/__mocks__/character"
import { mockEpisodesArray } from "@/__mocks__/episode"
import { OnlyEpisodes } from "@/components/episodes"
import { useCharactersStore } from "@/store"
import { render, waitFor } from "@testing-library/react"

// Mocking Zustand store
jest.mock('../../../../store', () => ({
    useCharactersStore: jest.fn(),
}))

describe('OnlyEpisodes Component', () => {

    beforeEach(() => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 1,
            characterOne: null,
            characterTwo: mockCharacter,
        });

        global.fetch = jest.fn();

    })

    it("render 'Select a character' when there isn't a selected character", () => {
        const CHARACTER_NUMBER = 1

        const { getByText } = render(<OnlyEpisodes characterNumber={CHARACTER_NUMBER} />)
        expect(getByText('Select a character')).toBeInTheDocument()
    })

    it("render character name and episodes when there is a selected character", async () => {
        const CHARACTER_NUMBER = 2;

        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ episodes: mockEpisodesArray }),
        });

        const { getByText } = render(<OnlyEpisodes characterNumber={CHARACTER_NUMBER} />)

        await waitFor(() => {
            expect(getByText(/Morty Smith's Episodes\s*\(5\)/)).toBeInTheDocument()
        })

        mockEpisodesArray.forEach((episode) => {
            expect(getByText(episode.name)).toBeInTheDocument()
        })
    })

    it('render spinner when is loading', async () => {
        const CHARACTER_NUMBER = 2;

        (fetch as jest.Mock).mockImplementationOnce(() =>
            new Promise(resolve => setTimeout(() => resolve({
                json: () => Promise.resolve({ episodes: [] }),
            }), 100))
        );

        const { getByTestId, queryByTestId } = render(<OnlyEpisodes characterNumber={CHARACTER_NUMBER} />)

        expect(getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => expect(queryByTestId('spinner')).not.toBeInTheDocument());
    })
})