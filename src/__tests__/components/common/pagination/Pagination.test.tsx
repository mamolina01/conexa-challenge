import { render, fireEvent } from '@testing-library/react';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/common';
import { generatePaginationNumbers } from '@/utils';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
    redirect: jest.fn(),
}));

jest.mock('../../../../utils', () => ({
    generatePaginationNumbers: jest.fn(),
}));

describe('Pagination component', () => {
    const TOTAL_PAGES = 10
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/test-path');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=2'));
    });

    test('renders pagination links correctly', () => {
        const generatePaginationNumbersMock = generatePaginationNumbers;
        (generatePaginationNumbersMock as unknown as jest.Mock).mockReturnValue([1, 2, 3, '...', 10]);

        const { getByText } = render(<Pagination totalPages={TOTAL_PAGES} />);

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
        expect(getByText('...')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
    });

    test('navigates to the correct page when a page number is clicked', () => {
        const generatePaginationNumbersMock = generatePaginationNumbers;
        (generatePaginationNumbersMock as unknown as jest.Mock).mockReturnValue([1, 2, 3, '...', 10]);

        const { getByText } = render(<Pagination totalPages={TOTAL_PAGES} />);

        const page3Link = getByText('3');
        fireEvent.click(page3Link);

        expect(page3Link.closest('a')).toHaveAttribute('href', '/test-path?page=3');
    });

    test('navigates to previous and next pages correctly', () => {
        const generatePaginationNumbersMock = generatePaginationNumbers;
        (generatePaginationNumbersMock as unknown as jest.Mock).mockReturnValue([1, 2, 3, '...', 10]);

        const { getByTestId } = render(<Pagination totalPages={TOTAL_PAGES} />);

        const prevLink = getByTestId("backLink");
        expect(prevLink).toHaveAttribute('href', '/test-path?page=1');

        const nextLink = getByTestId("forwardLink");
        expect(nextLink).toHaveAttribute('href', '/test-path?page=3');
    });

    test('redirects if currentPage is less than 1 or not a number', () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=0'));
        render(<Pagination totalPages={TOTAL_PAGES} />);
        expect(redirect).toHaveBeenCalledWith('/test-path');

        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=abc'));
        render(<Pagination totalPages={TOTAL_PAGES} />);
        expect(redirect).toHaveBeenCalledWith('/test-path');
    });

    test('generates correct URL when page number is less than or equal to 0', () => {
        const generatePaginationNumbersMock = generatePaginationNumbers;
        (generatePaginationNumbersMock as unknown as jest.Mock).mockReturnValue([1, 2, 3, '...', 10]);

        const { getByTestId } = render(<Pagination totalPages={TOTAL_PAGES} />);

        expect(getByTestId('1')).toHaveAttribute('href', '/test-path?page=1');
    });

});
