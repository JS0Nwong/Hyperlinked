import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


export default function DataTableColumnHeader({ column, title }) {
    return (
        <div className='flex items-center'>
            <Menu>
                <MenuButton
                    className='bg-transparent dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded transition-colors h-8 p-2 flex -ml-2 items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 dark:data-[open]:bg-neutral-800 data-[open]:text-neutral-800 dark:data-[open]:text-neutral-200 data-[open]:bg-neutral-200'
                >
                    {title}
                    {column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon className="ml-2 text-black/30 dark:text-white/30" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowUpIcon className="ml-2 text-black/30 dark:text-white/30" />
                    ) : (
                        <CaretSortIcon className="ml-2 text-black/30 dark:text-white/30" />
                    )}
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom start"
                    className="w-32 mt-1 origin-top-right rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <button 
                            className="group flex w-full items-center gap-1 rounded py-1.5 px-2 data-[focus]:bg-black/10  dark:data-[focus]:bg-white/10 transition-colors"
                            onClick={() => column.toggleSorting(false)}
                        >
                            <ArrowUpIcon className=" text-black/30 dark:text-white/30 font-normal" />
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">Asc</span>
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button 
                            className="group flex w-full items-center gap-1 rounded py-1.5 px-2 data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10 transition-colors"
                            onClick={() => column.toggleSorting(true)}
                        >
                            <ArrowDownIcon className="text-black/30 dark:text-white/30 " />
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">Desc</span>
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}
