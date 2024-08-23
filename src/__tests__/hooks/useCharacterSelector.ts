import { renderHook, act } from '@testing-library/react';
import { useCharactersStore } from '@/store';
import { useCharacterSelector } from '@/hooks';
import { mockCharacter } from '@/__mocks__/character';

// Mocking Zustand store
jest.mock('../../store', () => ({
    useCharactersStore: jest.fn(),
}))

describe('useCharacterSelector', () => {
    const setSelectorActive = jest.fn();
    const setCharacterOne = jest.fn();
    const setCharacterTwo = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('handleSelector toggles selectorActive off when the same selector is clicked', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 1,
            setSelectorActive,
            characterOne: null,
            characterTwo: null,
            setCharacterOne,
            setCharacterTwo,
        });

        const { result } = renderHook(() => useCharacterSelector());

        act(() => {
            result.current.handleSelector(1);
        });

        expect(setSelectorActive).toHaveBeenCalledWith(0);
    });

    test('handleSelector sets selectorActive to the new selector value', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 0,
            setSelectorActive,
            characterOne: null,
            characterTwo: null,
            setCharacterOne,
            setCharacterTwo,
        });

        const { result } = renderHook(() => useCharacterSelector());

        act(() => {
            result.current.handleSelector(2);
        });

        expect(setSelectorActive).toHaveBeenCalledWith(2);
    });

    test('selectCharacter sets characterOne when selectorActive is 1', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 1,
            characterOne: null,
            characterTwo: null,
            setSelectorActive,
            setCharacterOne,
            setCharacterTwo,
        });

        const { result } = renderHook(() => useCharacterSelector());

        act(() => {
            result.current.selectCharacter(mockCharacter);
        });

        expect(setCharacterOne).toHaveBeenCalledWith(mockCharacter);
        expect(setSelectorActive).toHaveBeenCalledWith(0);
    });

    test('selectCharacter sets characterTwo when selectorActive is 2', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 2,
            characterOne: null,
            characterTwo: null,
            setSelectorActive,
            setCharacterOne,
            setCharacterTwo,
        });

        const { result } = renderHook(() => useCharacterSelector());

        act(() => {
            result.current.selectCharacter(mockCharacter);
        });

        expect(setCharacterTwo).toHaveBeenCalledWith(mockCharacter);
        expect(setSelectorActive).toHaveBeenCalledWith(0);
    });

    test('selectCharacter does nothing if the character is already selected', () => {
        (useCharactersStore as unknown as jest.Mock).mockReturnValue({
            selectorActive: 1,
            characterOne: mockCharacter,
            characterTwo: null,
            setSelectorActive,
            setCharacterOne,
            setCharacterTwo,
        });

        const { result } = renderHook(() => useCharacterSelector());

        act(() => {
            result.current.selectCharacter(mockCharacter);
        });

        expect(setCharacterOne).not.toHaveBeenCalled();
        expect(setCharacterTwo).not.toHaveBeenCalled();
        expect(setSelectorActive).not.toHaveBeenCalled();
    });
});