import { Episode as EpisodeProps } from "@/interfaces"
import { Episode } from "./Episode"
import Image from "next/image"
import rick from "/public/rick.png"

interface Props {
    episodes: EpisodeProps[]
    emptyMessage: string
}

export const EpisodeList = ({ episodes, emptyMessage }: Props) => {
    return (
        <ul className='flex flex-col items-center gap-2 px-2 sm:px-4 max-h-[300px] w-full overflow-scroll'>
            {
                episodes.length === 0 ? (
                    <>
                        <p className="text-neutral-700 font-medium mb-5">{emptyMessage}</p>
                        <Image src={rick} alt="rick" width={250} height={250} />
                    </>
                ) : (
                    episodes.map((episode) => (
                        <Episode episode={episode} key={episode.id} />
                    ))
                )
            }
        </ul>
    )
}
