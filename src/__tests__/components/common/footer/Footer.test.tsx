import { Footer } from "@/components/common"
import { render } from "@testing-library/react"

describe('Footer component', () => {
    it('render text', () => {
        const { getByText } = render(<Footer />)

        expect(getByText('Matias Molina')).toBeInTheDocument()
        expect(getByText('| Frontend Developer')).toBeInTheDocument()
    })

    it('validate link props', () => {
        const { getByRole } = render(<Footer />)
        const link = getByRole('link', { name: /matias molina/i });
        expect(link).toHaveAttribute('href', 'https://matiasnmolina.com');
        expect(link).toHaveAttribute('target', '_blank');
    })
})