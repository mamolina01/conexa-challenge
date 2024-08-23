import { fetchEpisodes } from "@/utils";

// Mock global fetch
global.fetch = jest.fn();

describe('fetchEpisodes', () => {

    const URL_BASE = 'https://rickandmortyapi.com/api'

    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    test('fetches episodes and returns formatted episodes', async () => {

        const characterResponse = {
            episode: [`${URL_BASE}/episode/1`, `${URL_BASE}/episode/2`],
        };

        const episode1 = { id: 1, name: 'Pilot', air_date: 'December 2, 2013' };
        const episode2 = { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013' };

        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(characterResponse),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(episode1),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(episode2),
            });

        const characterId = '1';
        const result = await fetchEpisodes(characterId);

        expect(result).toEqual([
            { id: 1, name: 'Pilot', date: 'December 2, 2013' },
            { id: 2, name: 'Lawnmower Dog', date: 'December 9, 2013' },
        ]);

        expect(fetch).toHaveBeenCalledTimes(3);

        expect(fetch).toHaveBeenCalledWith(`${URL_BASE}/character/${characterId}`);
        expect(fetch).toHaveBeenCalledWith(`${URL_BASE}/episode/1`);
        expect(fetch).toHaveBeenCalledWith(`${URL_BASE}/episode/2`);
    });

    test('handles empty characterId', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ episode: [] }),
        });

        const result = await fetchEpisodes();

        expect(result).toEqual([]);
        expect(fetch).toHaveBeenCalledWith(`${URL_BASE}/character/`);
    });

    test('handles fetch error', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

        await expect(fetchEpisodes('1')).rejects.toThrow('Fetch failed');
    });
});
