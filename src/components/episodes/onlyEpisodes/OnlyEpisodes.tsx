"use client"
import { Character, Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { EpisodeList } from '../episode/EpisodeList'
import { FcSearch } from 'react-icons/fc'
import { Spinner } from '@/components/common'
import { useCharactersStore } from '@/store'

interface Props {
  characterNumber: number
}

export const OnlyEpisodes = ({ characterNumber }: Props) => {
  const [character, setCharacter] = useState<Character | null>(null)
  const [episodes, setEpisodes] = useState<EpisodeProps[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { characterOne, characterTwo } = useCharactersStore(state => state)

  useEffect(() => {
    if (characterNumber === 1) {
      setCharacter(characterOne)
    } else if (characterNumber === 2) {
      setCharacter(characterTwo)
    }
  }, [characterOne, characterTwo, characterNumber])

  useEffect(() => {
    const getCharacters = async () => {
      try {
        if (!character) {
          setEpisodes([])
          return
        }
        setIsLoading(true)
        const { episodes } = await fetch(`/api/episodes/?characterId=${character?.id}`).then((data) => data.json())
          .then((response) => response);

        setEpisodes(episodes)
      } catch (error) {
        setEpisodes([])
      }
      setIsLoading(false)
    }
    getCharacters()
  }, [character])

  return (
    <div className='flex flex-col gap-5 p-2 sm:p-5 items-center'>
      {!character ? (
        <>
          <h5 className='text-xl font-bold text-green-900'>
            Select a character
          </h5>
          <FcSearch className='text-9xl my-auto' />
        </>
      ) : (
        <>
          <h5 className='text-xl font-bold text-green-900'>
            {character.name}{"'"}s Episodes  {'('}{episodes.length}{')'}
          </h5>
          {isLoading ?
            <Spinner /> :
            <EpisodeList episodes={episodes} emptyMessage="The character doesn't have episodes" />
          }
        </>
      )}
    </div>
  )
}
