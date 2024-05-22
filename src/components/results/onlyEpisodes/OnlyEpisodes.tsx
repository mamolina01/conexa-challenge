import { Character, Episode } from '@/interfaces'
import React, { useEffect, useState } from 'react'

interface Props {
  character: Character | null
}

export const OnlyEpisodes = ({ character }: Props) => {
  const [episodes, setEpisodes] = useState<Episode[] | []>([])

  const getCharacters = async () => {
    try {
      if (!character) {
        setEpisodes([])
        return
      }
      const { episodes } = await fetch(`http://localhost:3000/api/episodes/?id=${character?.id}`).then((data) => data.json())
        .then((response) => response);

      setEpisodes(episodes)
    } catch (error) {
      throw new Error('Hubo un error')
    }
  }

  useEffect(() => {
    getCharacters()
  }, [character])

  return (
    <div className='flex flex-col gap-5 p-5 items-center'>
      <h5 className='text-2xl font-bold text-green-900'>
        {character ? character.name : 'Select character'}
      </h5>

      <div className='flex flex-col gap-2 max-h-[300px] overflow-scroll'>
        {
          episodes.length === 0 ? (
            <p>No hay episodios</p>
          ) : (
            episodes.map((episode) => (
              <p>{episode.name}</p>
            ))
          )
        }
      </div>
    </div>
  )
}
