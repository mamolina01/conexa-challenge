import { CharacterList } from "../components/characters";
import { Pagination } from "@/components/common";
import { OnlyEpisodes, SharedEpisodes } from "@/components/episodes";
import { getCharacters } from "@/actions";
import styles from './page.module.scss'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { data } = await getCharacters(page)

  return (
    <main className={styles.contentContainer}>
      <CharacterList characters={data?.results ?? []} />
      <Pagination totalPages={data?.info.pages!} />

      <div className={styles.episodesContainer} id="episodes">
        <OnlyEpisodes characterNumber={1} />
        <SharedEpisodes />
        <OnlyEpisodes characterNumber={2} />
      </div>
    </main>
  );
}
