import { getCharacters } from "@/actions/get-characters";
import { CharacterList } from "../components/characters";
import { Pagination } from "@/components/common";
import { OnlyEpisodes, SharedEpisodes } from "@/components/results";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, data } = await getCharacters(page)

  // TODO: Implement an error component
  if (!ok && !data) {
    return <p>Hubo un error</p>
  }

  return (
    <main>
      {/* TODO: Check this props */}
      <CharacterList characters={data?.results ?? []} />
      <Pagination totalPages={data?.info.pages!} />
      <div className="grid grid-cols-3 mt-20">
        <OnlyEpisodes name="Morty" />
        <SharedEpisodes />
        <OnlyEpisodes name="Rick" />
      </div>
    </main>
  );
}
