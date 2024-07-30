import { useAuth } from '../../utils/context/AuthContext'
import Logo from '../../assets/icon'


export default function Header() {
    const { currentUser, logout } = useAuth()

    return (
        <div className='flex flex-row w-full justify-between items-center '>
            {/* <h1 className='text-3xl font-display tracking-tight font-semibold text-neutral-900 dark:text-neutral-200'>
                Hyperlinked
            </h1> */}
            <Logo />
            <div className="flex flex-row items-center">
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
