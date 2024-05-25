import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from '../utils/context/ThemeProvider'
import { useAuth } from '../utils/context/AuthContext'

export default function Header() {
    const { darkMode, toggleTheme } = useTheme()
    const { currentUser, logout } = useAuth()
    return (
        <div className='flex flex-row w-full justify-between items-center'>
            <h1 className='text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-200'>
                Hyperlinked
            </h1>
            <div className="flex flex-row">
                <button className='mr-4 text-neutral-800 dark:text-neutral-200' onClick={() => toggleTheme()}>
                    <i>
                        {darkMode ? <SunIcon /> : <MoonIcon />}
                    </i>
                </button>
                {currentUser
                    ? <button className='text-sm font-medium text-neutral-500 dark:text-neutral-400 underline underline-offset-4' onClick={() => logout()}>Log out</button>
                    : <a
                        href="/login"
                        className='text-sm font-medium text-neutral-500 dark:text-neutral-400 underline underline-offset-4'>
                        Login
                    </a>}
            </div>
        </div>
    )
}
