import { Episode as EpisodeProps } from '@/interfaces'
import { BsCalendarDate } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { getShortText } from '@/utils'
import styles from './Episode.module.scss'

interface Props {
    episode: EpisodeProps
}

export const Episode = ({ episode }: Props) => {
    return (
        <div className={styles.container}>
            <p className={styles.episodeNumber}>Episode #{episode.id}</p>
            <div className={styles.propsContainer}>
                <FaRegUser className={styles.icon} />
                <span className={styles.text}>{getShortText(episode.name, 30)}</span>
            </div>
            <div className={styles.propsContainer}>
                <BsCalendarDate className={styles.icon} />
                <span className={styles.text}>{episode.date}</span>
            </div>
        </div>
    )
}
