import { getShortText } from "@/utils"

describe('getShortText util', () => {
    const TEXT = 'Hello world'

    it('shorten the text', () => {
        const text = getShortText(TEXT, 5)
        expect(text).toBe('Hello...')
    })

    it("Doesn't modify the text", () => {
        const text = getShortText(TEXT, 12)
        expect(text).toBe(TEXT)
    })
})