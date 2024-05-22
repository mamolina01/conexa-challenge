import { Character, Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { Episode } from '../episode/Episode'
import { EpisodeList } from '../episode/EpisodeList'

interface Props {
  character: Character | null
}

export const OnlyEpisodes = ({ character }: Props) => {
  const [episodes, setEpisodes] = useState<EpisodeProps[] | []>([])

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
      {!character ? (
        <h5 className='text-xl font-bold text-green-900'>
          Select a character
        </h5>
      ) : (
        <>
          <h5 className='text-xl font-bold text-green-900'>
            {character.name}'s Episodes  {'('}{episodes.length}{')'}
          </h5>
          <EpisodeList episodes={episodes} />
        </>
      )}
    </div>
  )
}
