import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useBoundStore } from '../utils/storeBinder'
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'

export default function SelectComponent() {
    const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks }))
    const keys = Object.keys(bookmarks)

    const [selectedCategory, setSelectedCategory] = useState(keys[0])

    return (
        <Listbox 
            value={selectedCategory} 
            onChange={setSelectedCategory} 
        >
            <ListboxButton 
                className='relative text-sm/6 text-start data-[active]:rounded-bl-none font-display mt-1 w-full border border-r-0 border-neutral-300 dark:border-neutral-700 rounded-l focus:outline-none py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 sm:text-sm'>
                    {selectedCategory}
                <ChevronDownIcon
                    className="group pointer-events-none absolute top-2 right-2 text-neutral-900 dark:text-neutral-100"
                    aria-hidden="true"
                />
            </ListboxButton>
            <ListboxOptions 
                anchor="bottom"
                className="z-50 w-[var(--button-width)] last:rounded-b-md rounded-t-none border border-white/5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-3 py-1.5 [--anchor-gap:var(--spacing-1)] focus:outline-none text-sm"
            >
                {keys.map((key) => (
                    <ListboxOption 
                        key={key} 
                        value={key} 
                        className="group flex cursor-default items-center justify-between py-2.5 px-3 rounded-md select-none data-[focus]:bg-white/10"
                    >
                        {key}
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox >
    )
}
