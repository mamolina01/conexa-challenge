"use client"
import { Episode as EpisodeProps } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { EpisodeList } from '../episodeList/EpisodeList'
import Image from 'next/image'
import rickAndMorty from "/public/rickandmorty.png"
import { Spinner } from '@/components/common'
import { useCharactersStore } from '@/store'
import styles from './SharedEpisodes.module.scss'

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
    <div className={styles.container}>
      {!characterOne || !characterTwo ? (
        <>
          <h5 className={styles.title}>
            Select both characters
          </h5>
          <Image src={rickAndMorty} alt="rickandmorty" />
        </>
      ) : (
        <>
          <h5 className={styles.title}>
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
