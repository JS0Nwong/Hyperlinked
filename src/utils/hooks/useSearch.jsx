import { useBoundStore } from "../storeBinder"
import { useState } from "react"

export default function useSearch() {
    const { 
        bookmarks, 
    } = useBoundStore((state) => ({ 
        bookmarks: state.bookmarks, 
    }))
    const [searchResults, setSearchResults] = useState([])

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
        const res = domElements.filter((element) => {
            return element.textContent.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setSearchResults(res)
    }

    return { 
        searchResults,
        setSearchResults, 
        getFilteredData, 
        getHostName, 
        sortAlphabetically, 
        globalSearch 
    }
}
