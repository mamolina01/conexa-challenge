import { Episode as EpisodeProps } from '@/interfaces'
import styles from './Episode.module.scss'
import { BsCalendarDate } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'

interface Props {
    episode: EpisodeProps
}

export const Episode = ({ episode }: Props) => {
    return (
        <div className={styles.container}>
            <p className='text-2xl font-semibold'>Episode #{episode.id}</p>
            <p className='flex items-center gap-2'>
                <FaRegUser className='text-lg' />
                <span className='text-xl'>{episode.name}</span>
            </p>
            <p className='flex items-center gap-2'>
                <BsCalendarDate className='text-lg' />
                <span className='text-neutral-600 text-lg'>{episode.date}</span>
            </p>
        </div>
    )
}
