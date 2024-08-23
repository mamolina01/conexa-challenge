import { Header } from "@/components/common"
import { render } from "@testing-library/react"

describe('Header component', () => {
    it("render 'Conexa Challenge'", () => {
        const { getByText } = render(<Header />)
        expect(getByText('Conexa Challenge')).toBeInTheDocument()
    })
})