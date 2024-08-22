"use client"
import { Character, Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { EpisodeList } from '../episodeList/EpisodeList'
import { FcSearch } from 'react-icons/fc'
import { Spinner } from '@/components/common'
import { useCharactersStore } from '@/store'
import styles from './OnlyEpisodes.module.scss'

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
    <div className={styles.container}>
      {!character ? (
        <>
          <h5 className={styles.title}>
            Select a character
          </h5>
          <FcSearch className={styles.searchIcon} />
        </>
      ) : (
        <>
          <h5 className={styles.title}>
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
