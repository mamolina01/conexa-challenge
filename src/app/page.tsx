"use client"
import { CharacterList } from "../components/characters";
import { Pagination } from "@/components/common";
import { OnlyEpisodes, SharedEpisodes } from "@/components/results";
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

  const getCharacters = async () => {
    try {
      const { data } = await fetch(`http://localhost:3000/api/characters/?page=${page}`).then((data) => data.json())
        .then((response) => response);

      setCharacters(data.results)
      setTotalPages(data.info.pages)
    } catch (error) {
      throw new Error('Hubo un error')
    }
  }

  useEffect(() => {
    getCharacters()
  }, [page])

  return (
    <main>
      {/* TODO: Check this props */}
      <CharacterList characters={characters} characterOne={characterOne} setCharacterOne={setCharacterOne} characterTwo={characterTwo} setCharacterTwo={setCharacterTwo} />
      <Pagination totalPages={totalPages} />
      <div className="grid grid-cols-3 mt-20">
        <OnlyEpisodes character={characterOne} />
        <SharedEpisodes />
        <OnlyEpisodes character={characterTwo} />
      </div>
    </main>
  );
}
