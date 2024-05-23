"use client"
import { Loading } from "@/components/common/loading/Loading";
import { CharacterList } from "../components/characters";
import { Pagination } from "@/components/common";
import { OnlyEpisodes, SharedEpisodes } from "@/components/episodes";
import { Character } from "@/interfaces";
import { useEffect, useState } from "react";

interface Props {
  searchParams: {
    page?: string
  }
}

export default function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const [characters, setCharacters] = useState<Character[] | []>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [characterOne, setCharacterOne] = useState<Character | null>(null)
  const [characterTwo, setCharacterTwo] = useState<Character | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    const getCharacters = async () => {
      try {
        setIsLoading(true)
        const { data } = await fetch(`/api/characters/?page=${page}`).then((data) => data.json())
          .then((response) => response);

        setCharacters(data.results)
        setTotalPages(data.info.pages)
      } catch (error) {
        setCharacters([])
      }
      setIsLoading(false)
    }
    getCharacters()
  }, [page])

  if (isLoading) {
    return <Loading />
  }

  return (
    <main>

      <CharacterList characters={characters} characterOne={characterOne} setCharacterOne={setCharacterOne} characterTwo={characterTwo} setCharacterTwo={setCharacterTwo} />
      <Pagination totalPages={totalPages} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-5 md:mt-10 min-h-[300px]">
        <OnlyEpisodes character={characterOne} />
        <SharedEpisodes characterOne={characterOne} characterTwo={characterTwo} />
        <OnlyEpisodes character={characterTwo} />
      </div>
    </main>
  );
}
