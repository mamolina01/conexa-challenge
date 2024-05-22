import { Character, Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { EpisodeList } from '../episode/EpisodeList'

interface Props {
  characterOne: Character | null
  characterTwo: Character | null
}


export const SharedEpisodes = ({ characterOne, characterTwo }: Props) => {
  const [episodes, setEpisodes] = useState<EpisodeProps[] | []>([])

  const getCharacters = async () => {
    try {
      if (!characterOne || !characterTwo) {
        setEpisodes([])
        return
      }
      const { episodes } = await fetch(`http://localhost:3000/api/shared-episodes/?characterOneId=${characterOne.id}&characterTwoId=${characterTwo.id}`)
        .then((data) => data.json())
        .then((response) => response);

      setEpisodes(episodes)
    } catch (error) {
      throw new Error('Hubo un error')
    }
  }

  useEffect(() => {
    getCharacters()
  }, [characterOne, characterTwo])

  return (
    <div className='flex flex-col gap-5 p-5 items-center bg-green-50 rounded-xl'>
      {!characterOne || !characterTwo ? (
        <h5 className='text-xl font-bold text-green-900'>
          Select both characters
        </h5>
      ) : (
        <>
          <h5 className='text-xl font-bold text-green-900'>
            Shared Episodes  {'('}{episodes.length}{')'}
          </h5>
          <EpisodeList episodes={episodes} />
        </>
      )
      }
    </div>
  )
}
