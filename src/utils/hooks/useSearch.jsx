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
        if (!searchQuery) return
        
    }
    const sortAlphabetically = () => {

    }

    const globalSearch = (searchQuery) => {
        const domElements = Array.from(document.getElementById('user-saved-links-wrapper').children)
        for (const element of domElements) {
            if (!element.textContent.toLowerCase().includes(searchQuery.toLowerCase())) element.classList.add('hidden')
            else element.classList.remove('hidden')
        }
    }

    return { 
        getFilteredData, 
        getHostName, 
        sortAlphabetically, 
        globalSearch 
    }
}
