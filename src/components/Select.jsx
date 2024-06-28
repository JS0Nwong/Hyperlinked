import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'
import {colors as colorObj} from '../utils/colors'

export default function SelectComponent({ obj, type, defaultValue, handler }) {
    const keys = Object.keys(obj)
    return (
        <Listbox
            as='div'
            value={defaultValue}
            onChange={handler}
            className='w-full'
        >
            <ListboxButton
                className='relative text-sm/6 text-start data-[active]:rounded-bl-none font-display mt-1 w-full border border-r-0 border-neutral-300 dark:border-neutral-700 rounded-l focus:outline-none py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 sm:text-sm flex items-center'
            >
                <div className={`w-3 h-3 ${type === 'folderSelect' ? colorObj[obj[defaultValue].properties?.color] : obj[defaultValue]} rounded-full mr-2 border bg-opacity-35`} />
                {defaultValue}
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
                        <div className='flex flex-row items-center'>
                            <div className={`w-3 h-3 ${type === 'folderSelect' ? colorObj[obj[key].properties?.color] : colorObj[key]} rounded-full mr-2 border bg-opacity-35`} />
                            {key}
                        </div>
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox >
    )
}
