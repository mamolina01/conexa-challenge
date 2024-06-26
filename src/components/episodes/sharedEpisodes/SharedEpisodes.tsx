"use client"
import { Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { EpisodeList } from '../episode/EpisodeList'
import Image from 'next/image'
import rickAndMorty from "/public/rickandmorty.png"
import { Spinner } from '@/components/common'
import { useCharactersStore } from '@/store'

export const SharedEpisodes = () => {
  const [episodes, setEpisodes] = useState<EpisodeProps[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { characterOne, characterTwo } = useCharactersStore(state => state)

  useEffect(() => {
    const getCharacters = async () => {
      try {
        if (!characterOne || !characterTwo) {
          setEpisodes([])
          return
        }
        setIsLoading(true)
        const { episodes } = await fetch(`/api/shared-episodes/?characterOneId=${characterOne.id}&characterTwoId=${characterTwo.id}`)
          .then((data) => data.json())
          .then((response) => response);

        setEpisodes(episodes)
      } catch (error) {
        setEpisodes([])
      }
      setIsLoading(false)
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
          {isLoading ?
            <Spinner /> :
            <EpisodeList episodes={episodes} emptyMessage={"They don't have episodes together"} />
          }
        </>
      )
      }
    </div>
  )
}
