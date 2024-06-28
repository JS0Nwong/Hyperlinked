import { useBoundStore } from "../storeBinder"

export default function useSearch() {
    const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks }))
    const keys = Object.keys(bookmarks)

    const getFilteredData = (searchQuery) => {
        if (!searchQuery) return bookmarks
        const filteredData = keys.map((key) => {
            return bookmarks[key].filter((bookmark) => {
                return bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase())
            })
        })
        return { sorted: filteredData }
    }
    const getHostName = (searchQuery) => {
        if (!searchQuery) return bookmarks
        const filteredData = keys.map((key) => {
            return bookmarks[key].filter((bookmark) => {
                return bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
            })
        })
        return filteredData
    }
    const sortAlphabetically = () => {

    }

    return { getFilteredData, getHostName, sortAlphabetically }
}
