export const fetchEpisodes = async (characterId: string = '') => {
    const { episode: episodes } = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then((data) => data.json())
        .then((response) => response);

    const formatedEpisodes = await Promise.all(episodes.map(async (episodeUrl: string) => {
        const episode = await fetch(episodeUrl).then(response => response.json());
        return {
            id: episode.id,
            name: episode.name,
            date: episode.air_date
        };
    }));

    return formatedEpisodes
}