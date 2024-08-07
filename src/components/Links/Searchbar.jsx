import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { Input } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { MdKeyboardCommandKey } from "react-icons/md";

import debounce from "lodash/debounce"

import useSearch from "../../utils/hooks/useSearch"
import useUserAgent from "../../utils/hooks/useUserAgent";
import useData from "../../utils/hooks/useData";

export default function Searchbar() {
    const device = useUserAgent()
    const [searchParams, setSearchParams] = useSearchParams()
    const { handleSubmit } = useData()
    const { globalSearch } = useSearch()
    
    const handleQueryChange = (search) => {
        const query = search.trim()
        // Guard clause to return early if query is empty and delete empty query params
        if (query === '') {
            searchParams.delete('q')
            setSearchParams(searchParams)
            const domElements = Array.from(document.getElementById('user-saved-links-wrapper').children)
            for (const element of domElements) { element.classList.remove('hidden') }
            return
        }
        globalSearch(query)
        setSearchParams({ q: query })
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const value = e.target.value.trim()
            if (value === '') return
            handleSubmit(value)
            const domElements = Array.from(document.getElementById('user-saved-links-wrapper').children)
            for (const element of domElements) { element.classList.remove('hidden') }
            e.target.value = ''
            searchParams.delete('q')
            setSearchParams(searchParams)
        }
        return
    }

    // Debounce the search query by 250ms
    const searchDebounce = useCallback(debounce(handleQueryChange, 250), [])

    return (
        <div className="flex justify-between mt-0 md:mt-0 w-full">
            <div className="w-full relative flex items-center text-neutral-500 dark:focus-within:text-neutral-100 focus-within:text-neutral-800">
                <MagnifyingGlassIcon className="absolute w-5 h-5 pointer-events-none ml-2" />
                <Input
                    defaultValue={searchParams.get('query') || ''}
                    id='searchbar'
                    required={false}
                    placeholder={[`Insert a link, color, or plain text`]}
                    autoComplete='off'
                    type='text'
                    className='truncate pl-8 pr-3 font-display font-medium tracking-tight w-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-md focus:outline-none dark:focus:border-neutral-200 focus:border-neutral-800 py-2 px-3 placeholder:text-neutral-500  bg-neutral-50 dark:bg-neutral-900 text-sm transition duration-100 ease-out'
                    name="searchbar"
                    onChange={(e) => searchDebounce(e.target.value)}
                    onKeyUp={(e) => handleEnter(e)}
                />
                <div className="hidden md:flex items-center absolute right-0 mr-2 pointer-events-none">
                    <kbd className="select-none rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-0.5 px-1 flex items-center">
                        {device === 'windows'
                            ? <kbd className="select-none rounded text-sm bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 px-1 tracking-tighter">
                                CTRL
                            </kbd>
                            : <MdKeyboardCommandKey />}
                    </kbd>
                    <kbd className="rounded text-sm bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-0.5 px-2 mx-1 flex items-center font-medium">
                        F
                    </kbd>
                </div>
            </div>
        </div>
    )
}
