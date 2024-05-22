import { Character } from '@/interfaces'
import React from 'react'

interface Props {
  character: Character | null
}

export const OnlyEpisodes = ({ character }: Props) => {

  return (
    <div className='flex flex-col gap-5 p-5 items-center'>
      <h5 className='text-2xl font-bold text-green-900'>
        {character ? character.name : 'Select character'}
      </h5>

      <div className='flex flex-col gap-2 '>

      </div>
    </div>
  )
}
