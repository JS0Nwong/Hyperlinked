import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ExitIcon, GearIcon, CaretSortIcon } from '@radix-ui/react-icons'

export default function Dropdown({ buttonName }) {
    return (
        <Menu>
            <MenuButton className='ml-2 pr-2 text-neutral-500 dark:text-neutral-400 font-medium text-sm flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded py-1.5 px-3 transition duration-100 ease-linear data-[active]:bg-neutral-200 dark:data-[active]:bg-neutral-800'>
                <div className='w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' />
                <p className='mx-2'>{buttonName}</p>
                <CaretSortIcon />
            </MenuButton>
            <MenuItems
                anchor="bottom end"
                className="z-50 font-medium mt-1 w-44 px-1 py-1.5 text-sm/6 origin-top-right rounded-md border border-neutral-300 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-sm"
            >
                <MenuItem>
                    <a
                        href='/settings'
                        className="group flex w-full text-sm items-center gap-2 rounded py-1.5 px-2 select-none data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10 data-[focus]:text-neutral-800 dark:data-[focus]:text-neutral-200 transition duration-100 ease-out "
                    >
                        <GearIcon />
                        Settings
                    </a>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full text-sm items-center gap-2 py-1.5 px-2 rounded select-none data-[focus]:bg-red-500/30 dark:data-[focus]:bg-red-500/30 data-[focus]:text-neutral-800 dark:data-[focus]:text-neutral-200 transition duration-100 ease-out ">
                        <ExitIcon />
                        Log out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu >
    )
}
