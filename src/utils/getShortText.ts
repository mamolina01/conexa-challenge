export const getShortText = (value: string, limit: number) => {
    if (value.length < limit) {
        return value
    }
    return `${value.substring(0, limit).trim()}...`
}