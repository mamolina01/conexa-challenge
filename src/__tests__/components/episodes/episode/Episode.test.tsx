import { mockEpisodesArray } from "@/__mocks__/episode"
import { Episode } from "@/components/episodes/episode/Episode"
import { render } from "@testing-library/react"

describe('Episode component', () => {
    it('render episode details', () => {
        const { getByText } = render(<Episode episode={mockEpisodesArray[0]} />)

        expect(getByText(`Episode #${mockEpisodesArray[0].id}`)).toBeInTheDocument()
        expect(getByText(mockEpisodesArray[0].name)).toBeInTheDocument()
        expect(getByText(mockEpisodesArray[0].date)).toBeInTheDocument()
    })
})