import { Episode as EpisodeProps } from '@/interfaces'
import { BsCalendarDate } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { getShortText } from '@/utils'

interface Props {
    episode: EpisodeProps
}

export const Episode = ({ episode }: Props) => {
    return (
        <div className='border-2 border-orange-300 bg-white text-black flex flex-col w-full p-2 rounded-xl'>
            <p className='text-lg sm:text-xl font-semibold'>Episode #{episode.id}</p>
            <p className='flex items-center gap-2'>
                <FaRegUser className='sm:text-lg' />
                <span className='sm:text-lg'>{getShortText(episode.name, 30)}</span>
            </p>
            <p className='flex items-center gap-2'>
                <BsCalendarDate className='sm:text-lg' />
                <span className='text-neutral-600 sm:text-lg'>{episode.date}</span>
            </p>
        </div>
    )
}
