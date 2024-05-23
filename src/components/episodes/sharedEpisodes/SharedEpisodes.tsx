import { Character, Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { EpisodeList } from '../episode/EpisodeList'
import Image from 'next/image'
import rickAndMorty from "/public/rickandmorty.png"

interface Props {
  characterOne: Character | null
  characterTwo: Character | null
}


export const SharedEpisodes = ({ characterOne, characterTwo }: Props) => {
  const [episodes, setEpisodes] = useState<EpisodeProps[] | []>([])

  useEffect(() => {
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
        setEpisodes([])
        throw new Error('Hubo un error')
      }
    }
    getCharacters()
  }, [characterOne, characterTwo])

  return (
    <div className='flex flex-col gap-5 p-5 items-center bg-green-50 rounded-xl'>
      {!characterOne || !characterTwo ? (
        <>
          <h5 className='text-xl font-bold text-green-900'>
            Select both characters
          </h5>
          <Image src={rickAndMorty} alt="rickandmorty" />
        </>
      ) : (
        <>
          <h5 className='text-xl font-bold text-green-900'>
            Shared Episodes  {'('}{episodes.length}{')'}
          </h5>
          <EpisodeList episodes={episodes} emptyMessage={"They don't have episodes together"} />
        </>
      )
      }
    </div>
  )
}
