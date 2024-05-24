import { CharacterList } from "../components/characters";
import { Pagination } from "@/components/common";
import { OnlyEpisodes, SharedEpisodes } from "@/components/episodes";
import { getCharacters } from "@/actions";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { data } = await getCharacters(page)

  return (
    <main>
      <CharacterList characters={data?.results ?? []} />
      <Pagination totalPages={data?.info.pages!} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-5 md:mt-10 min-h-[300px]">
        <OnlyEpisodes characterNumber={1} />
        <SharedEpisodes />
        <OnlyEpisodes characterNumber={2} />
      </div>
    </main>
  );
}
