import { Episode as EpisodeProps } from "@/interfaces"
import { Episode } from "./Episode"


interface Props {
    episodes: EpisodeProps[]
}

export const EpisodeList = ({ episodes }: Props) => {
    return (
        <ul className='flex flex-col items-center gap-2 px-4 max-h-[300px] overflow-scroll'>
            {
                episodes.length === 0 ? (
                    <p>No episodes</p>
                ) : (
                    episodes.map((episode) => (
                        <Episode episode={episode} key={episode.id} />
                    ))
                )
            }
        </ul>
    )
}
