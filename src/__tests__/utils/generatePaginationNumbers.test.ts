import { generatePaginationNumbers } from "@/utils";

describe('generatePaginationNumbers', () => {
    test('generates all pages if totalPages is less than or equal to 7', () => {
        expect(generatePaginationNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
        expect(generatePaginationNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('generates pagination with currentPage <= 3', () => {
        expect(generatePaginationNumbers(1, 10)).toEqual([1, 2, 3, '...', 9, 10]);
        expect(generatePaginationNumbers(2, 10)).toEqual([1, 2, 3, '...', 9, 10]);
        expect(generatePaginationNumbers(3, 10)).toEqual([1, 2, 3, '...', 9, 10]);
    });

    test('generates pagination with currentPage >= totalPages - 2', () => {
        expect(generatePaginationNumbers(8, 10)).toEqual([1, 2, '...', 8, 9, 10]);
        expect(generatePaginationNumbers(9, 10)).toEqual([1, 2, '...', 8, 9, 10]);
        expect(generatePaginationNumbers(10, 10)).toEqual([1, 2, '...', 8, 9, 10]);
    });

    test('generates pagination with middle pages', () => {
        expect(generatePaginationNumbers(4, 10)).toEqual([1, '...', 3, 4, 5, '...', 10]);
        expect(generatePaginationNumbers(5, 15)).toEqual([1, '...', 4, 5, 6, '...', 15]);
        expect(generatePaginationNumbers(6, 20)).toEqual([1, '...', 5, 6, 7, '...', 20]);
    });

    test('handles edge cases', () => {
        expect(generatePaginationNumbers(1, 1)).toEqual([1]);
        expect(generatePaginationNumbers(1, 2)).toEqual([1, 2]);
        expect(generatePaginationNumbers(2, 2)).toEqual([1, 2]);
    });
});
