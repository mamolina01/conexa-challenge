import { getCharacters } from "@/actions/get-characters";
import { CharacterList } from "../components/characters";
import { Pagination } from "@/components/common";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, data } = await getCharacters(page)

  if (!ok && !data) {
    return <p>Hubo un error</p>
  }

  return (
    <main>
      <CharacterList characters={data?.results ?? []} />

      <Pagination totalPages={data?.info.pages!} />

    </main>
  );
}
