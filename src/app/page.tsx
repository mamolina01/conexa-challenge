import { CharacterList } from "./components/characters";

export default async function Home() {

  return (
    <main>
      <h4 className="text-3xl uppercase">CHARACTERS</h4>
      <div className="grid grid-cols-2 gap-5 ">
        <CharacterList subtitle="Character 1" />
        <CharacterList subtitle="Character 2" />
      </div>
    </main>
  );
}
