import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { Input } from "@headlessui/react"
import debounce  from "lodash/debounce"

export default function Searchbar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const handleQueryChange = (search) => {
        const query = search.trim()
        // Guard clause to return early if query is empty and delete empty query params
        if (query === '') {
            searchParams.delete('query')
            setSearchParams(searchParams)
            return
        }
        setSearchParams({ query: query })
    }

    // Debounce the search query by 300ms
    const searchDebounce = useCallback(debounce(handleQueryChange, 300), [])

    return (
        <Input
            defaultValue={searchParams.get('query') || ''}
            id='searchbar'
            required={false}
            placeholder='Search for bookmarks'
            autoComplete='off'
            type='text'
            className='font-display mt-6 w-full border border-neutral-300 dark:border-neutral-700 rounded focus:outline-none dark:focus:border-neutral-200 focus:border-neutral-800 py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
            name="searchbar"
            onChange={(e) => searchDebounce(e.target.value)}
        />
    )
}
