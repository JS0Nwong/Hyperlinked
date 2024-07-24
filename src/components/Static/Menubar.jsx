import { SunIcon, MoonIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { useTheme } from '../../utils/context/ThemeProvider'
import { useAuth } from '../../utils/context/AuthContext'
import { useLocation } from 'react-router'

import Dropdown from '../Dropdown'
import FolderNavigation from '../FolderNavigation'

export default function Menubar() {
    const { darkMode, toggleTheme } = useTheme()
    const { currentUser } = useAuth()
    const location = useLocation()

    return (
        <div className='w-full p-4 flex justify-between sticky top-0 z-40 backdrop-blur-sm bg-white/90 dark:bg-[#121212]/40 border-b border-neutral-100 dark:border-neutral-800'>
            <div className="flex items-center w-full">
                <h1 className='hidden md:block text-3xl font-display tracking-tight font-semibold text-neutral-900 dark:text-neutral-200'>
                    Hyperlinked
                </h1>
                <p className='hidden md:block mx-4 text-3xl font-thin text-neutral-300 dark:text-neutral-700'>/</p>
                <FolderNavigation />
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-row items-center mr-4 ">
                    <a href='/help' className='mr-4 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 hover:dark:text-neutral-200 transition-colors focus:outline-none'>
                        <QuestionMarkCircledIcon />
                    </a>
                    <button className='text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 hover:dark:text-neutral-200 transition-colors focus:outline-none' onClick={() => toggleTheme()}>
                        <i> {darkMode ? <SunIcon /> : <MoonIcon />} </i>
                    </button>
                </div>
                <div className='h-6 bg-neutral-300 dark:bg-neutral-700 w-px' />
                <div className='z-50'>
                    <Dropdown buttonName={currentUser.displayName} />
                </div>
            </div>
        </div>
    )
}
