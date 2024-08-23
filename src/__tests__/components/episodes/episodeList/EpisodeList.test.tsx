import { mockEpisodesArray } from "@/__mocks__/episode"
import { EpisodeList } from "@/components/episodes/episodeList/EpisodeList"
import { render } from "@testing-library/react"

describe('EpisodeList component', () => {
    const emptyMessage = "The character doesn't have episodes"
    it('render episodes name', () => {
        const { getByText } = render(<EpisodeList episodes={mockEpisodesArray} emptyMessage={emptyMessage} />)

        mockEpisodesArray.forEach((episode) => {
            expect(getByText(episode.name)).toBeInTheDocument()
        })
    })

    it('render empty message', () => {
        const { getByText } = render(<EpisodeList episodes={[]} emptyMessage={emptyMessage} />)

        expect(getByText(emptyMessage)).toBeInTheDocument()
    })
})