import React from 'react'

export const SharedEpisodes = () => {
  return (
    <div className='flex flex-col gap-5 p-5 items-center bg-green-50 rounded-xl'>
      <h5 className='text-2xl font-semibold text-neutral-800'>Shared Episodes</h5>

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
