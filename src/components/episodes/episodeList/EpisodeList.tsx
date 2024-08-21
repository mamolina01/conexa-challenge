import { Episode as EpisodeProps } from "@/interfaces"
import { Episode } from "../episode/Episode"
import Image from "next/image"
import rick from "/public/rick.png"
import styles from './EpisodeList.module.scss'

interface Props {
    episodes: EpisodeProps[]
    emptyMessage: string
}

export const EpisodeList = ({ episodes, emptyMessage }: Props) => {
    return (
        <div className={styles.container}>
            {
                episodes.length === 0 ? (
                    <>
                        <p className={styles.text}>{emptyMessage}</p>
                        <Image src={rick} alt="rick" width={250} height={250} />
                    </>
                ) : (
                    episodes.map((episode) => (
                        <Episode episode={episode} key={episode.id} />
                    ))
                )
            }
        </div>
    )
}
