import React from 'react'

interface Props {
  name: string
}

export const OnlyEpisodes = ({ name }: Props) => {

  return (
    <div className='flex flex-col gap-5 p-5 items-center'>
      <h5 className='text-2xl font-bold text-green-900'>{name}</h5>

      <div className='flex flex-col gap-2 '>
        <p className='text-neutral-700'>episodio 1</p>
        <p className='text-neutral-700'>episodio 2</p>
        <p className='text-neutral-700'>episodio 3</p>
        <p className='text-neutral-700'>episodio 4</p>
        <p className='text-neutral-700'>episodio 5</p>
      </div>
    </div>
  )
}
