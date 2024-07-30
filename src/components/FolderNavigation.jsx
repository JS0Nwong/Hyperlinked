import { useNavigate } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import { useBoundStore } from "../utils/storeBinder"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { colors as colorObj } from '../utils/colors'
import toast from "react-hot-toast"

export default function FolderNavigation() {
    const [hovered, setHovered] = useState(false)
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const {
        bookmarks,
        currentFolderDirectory,
        setCurrentFolderDirectory,
        setOpenCreateGroup,
    } = useBoundStore((state) => ({
        bookmarks: state.bookmarks,
        currentFolderDirectory: state.currentFolderDirectory,
        setCurrentFolderDirectory: state.setCurrentFolderDirectory,
        setOpenCreateGroup: state.setOpenCreateGroup,
    }))
    const keys = Object.keys(bookmarks)

    const handleChange = (value) => {
        if (value === 'new-folder') {
            setOpenCreateGroup()
            return
        }
        if (value === 'delete-folder') { 
            const folder = bookmarks[currentFolderDirectory]
            delete bookmarks[currentFolderDirectory]
            setCurrentFolderDirectory(bookmarks[keys[0]].properties?.title)
            navigate(`/links/${bookmarks[keys[0]]}`)
            toast.success(`Deleted ${folder}`,{
                icon: <div className="w-1 h-1 bg-green-500 rounded-full" />
            })
         }
        if (!Object.keys(bookmarks).includes(value)) return
        setCurrentFolderDirectory(value)
        navigate(`/links/${value}`)
    }

    return (
        <Listbox
            as='div'
            value={currentFolderDirectory}
            onChange={(value) => handleChange(value)}
            tabIndex={0}
            className='focus:outline-none'
        >
            {({ open }) => (
                <>
                    <ListboxButton
                        className={`flex items-center justify-between rounded-full relative text-sm/6 text-start font-display w-44 max-w-[500px] py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 sm:text-sm transition duration-100 ease-out hover:bg-neutral-200 dark:hover:bg-neutral-800 data-[active]:bg-neutral-200 dark:data-[active]:bg-neutral-800 focus:outline focus:outline-2 dark:focus:outline-neutral-600 focus:outline-neutral-300`}
                    >
                        <div className='flex flex-row items-center'>
                            <div className={`w-4 h-4 ${colorObj[bookmarks[currentFolderDirectory].properties?.color]} rounded-full mr-2 `} />
                            {currentFolderDirectory}
                        </div>
                        <ChevronDownIcon
                            className="group pointer-events-none ml-1 text-neutral-900 dark:text-neutral-100"
                            aria-hidden="true"
                        />
                    </ListboxButton>
                    <ListboxOptions
                        anchor="bottom"
                        className="tracking-tight mt-1 z-50 w-[var(--button-width)] rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 px-1 py-1.5 [--anchor-gap:var(--spacing-1)] focus:outline-none text-sm"
                    >
                        {keys.map((key, index) => (
                            <ListboxOption
                                key={key}
                                value={key}
                                className="font-medium my-1 group flex cursor-pointer items-center justify-between py-1.5 px-1.5 rounded-md select-none data-[selected]:bg-black/10 dark:data-[selected]:bg-white/10 data-[selected]:text-neutral-800 dark:data-[selected]:text-neutral-200 data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10 data-[focus]:text-neutral-800 dark:data-[focus]:text-neutral-200  transition duration-100 ease-out"
                            >
                                <div className='flex flex-row items-center'>
                                    <div className={`w-4 h-4 ${colorObj[bookmarks[key].properties?.color]} rounded-full mr-2 bg-opacity-35`} />
                                    <p className="truncate max-w-[176px]">{key}</p>
                                </div>
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <kbd className="group-data-[selected]:hidden bg-neutral-300 dark:bg-neutral-800 px-1.5 rounded">
                                    {index + 1}
                                </kbd>
                            </ListboxOption>
                        ))}
                        <div className="h-px w-full bg-neutral-300 dark:bg-neutral-700 my-1.5" />
                        <ListboxOption
                            value={'new-folder'}
                            className="font-medium tracking-tight group flex cursor-pointer items-center py-1.5 px-1.5 rounded-md select-none data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10 data-[focus]:text-neutral-800 dark:data-[focus]:text-neutral-200 transition duration-100 ease-out"
                        >
                            <PlusIcon className="size-4 mr-2 fill-white " />
                            <div className='flex flex-row items-center'>
                                New folder
                            </div>
                        </ListboxOption>
                        <ListboxOption
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            // onMouseDown={() => handleMouseDown()}
                            // onMouseUp={(e) => {
                            //     e.preventDefault()
                            //     handleMouseUp()
                            // }}
                            value={'delete-folder'}
                            className="relative font-medium tracking-tight group flex cursor-pointer items-center py-1.5 px-1.5 rounded-md select-none data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10 data-[focus]:text-neutral-800 dark:data-[focus]:text-neutral-200  transition duration-100 ease-out"
                        >
                            <TrashIcon className="size-4 mr-2 fill-white " />
                            <div className='flex flex-row items-center'>
                                {hovered ? 'Hold to delete' : 'Delete folder'}
                            </div>
                            <motion.div
                                initial={{ width: 0 + '%' }}
                                animate={{ width: progress + '%' }}
                                exit={{ width: 0 + '%', opacity: 0 }}
                                className=" h-full absolute top-0 left-0 bg-red-500 -z-[1] rounded-md pointer-events-none max-w-full"
                            />
                        </ListboxOption>
                    </ListboxOptions>
                </>
            )}
        </Listbox >
    )
}
