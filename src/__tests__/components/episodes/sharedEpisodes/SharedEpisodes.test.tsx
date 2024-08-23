import { mockCharacter, mockCharactersArray } from "@/__mocks__/character"
import { mockEpisodesArray } from "@/__mocks__/episode"
import { SharedEpisodes } from "@/components/episodes"
import { useCharactersStore } from "@/store"
import { render, waitFor } from "@testing-library/react"

// Mocking Zustand store
jest.mock('../../../../store', () => ({
    useCharactersStore: jest.fn(),
}))

describe('SharedEpisodes component', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    })

    it("render 'Select both characters' when there aren't selected characters", () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 0,
            characterOne: null,
            characterTwo: null,
        });

        const { getByText } = render(<SharedEpisodes />)
        expect(getByText('Select both characters')).toBeInTheDocument()
    })

    it("render 'Select both characters' when there is only one selected character", () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 0,
            characterOne: mockCharacter,
            characterTwo: null,
        });

        const { getByText } = render(<SharedEpisodes />)
        expect(getByText('Select both characters')).toBeInTheDocument()
    })

    it("render shared episodes", async () => {

        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 0,
            characterOne: mockCharactersArray[0],
            characterTwo: mockCharactersArray[1],
        });

        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ episodes: mockEpisodesArray }),
        });

        const { getByText } = render(<SharedEpisodes />)

        await waitFor(() => {
            expect(getByText(/Shared Episodes\s*\(5\)/)).toBeInTheDocument()
        })

        mockEpisodesArray.forEach((episode) => {
            expect(getByText(episode.name)).toBeInTheDocument()
        })
    })

})