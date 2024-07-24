import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function DataTableSelect({ options, onSelect}) {
    const [selected, setSelected] = useState(options[0])

    const handleValueChange = (value) => {
        setSelected(value)
        onSelect(value)
    }

    return (
        <Listbox
            as='div'
            value={selected}
            onChange={handleValueChange}
            className='w-full '
        >
            <ListboxButton
                className={`rounded relative text-sm/6 font-display w-[136px] py-1.5 px-2 border border-neutral-200 dark:border-neutral-800 focus:outline-none  text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 bg-neutral-50 dark:bg-neutral-900 sm:text-sm flex items-center data-[focus]:border-neutral-800 dark:data-[focus]:border-neutral-200 data-[active]:border-neutral-500 `}
            >
                {selected}
                <ChevronDownIcon
                    className="group pointer-events-none absolute top-2 right-2 text-neutral-900 dark:text-neutral-100"
                    aria-hidden="true"
                />
            </ListboxButton>
            <ListboxOptions
                anchor="bottom"
                className="mt-1 z-50 w-[var(--button-width)] rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-1 py-1.5 [--anchor-gap:var(--spacing-1)] focus:outline-none text-sm"
            >
                {options.map((key) => (
                    <ListboxOption
                        key={key}
                        value={key}
                        className="group flex cursor-pointer items-center justify-between py-1.5 px-2 rounded select-none data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10"
                    >
                        <div className='flex flex-row items-center'>
                            {key}
                        </div>
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox >
    )
}
