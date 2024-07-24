import Menubar from "../components/Static/Menubar"

export default function Error() {
    return (
        <div className="flex flex-col w-full h-screen">
            <Menubar />
            <div className='w-full h-screen flex flex-col items-center justify-center text-neutral-800 dark:text-neutral-200'>
                <div className="flex flex-row divide-x-2 items-center">
                    <p className="font-medium text-2xl pr-2">404</p>
                    <p className="font-medium text-md pl-2">Page not found.</p>
                </div>
                <a 
                    href='/'
                    className="mt-4 text-lg font-medium text-neutral-500 dark:text-neutral-400 underline underline-offset-4">Return home</a>
            </div>
        </div>
    )
}
