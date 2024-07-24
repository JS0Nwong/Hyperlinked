import { Button } from "@headlessui/react"
import { themes } from "../utils/themes"
import { useTheme } from "../utils/context/ThemeProvider"

export default function ThemeButton({ theme }) {
    const { darkMode, toggleTheme } = useTheme()

    const formattedTheme = theme.toLowerCase()
    const dark = darkMode ? 'dark' : 'light'

    return (
        <div className="flex items-center flex-col my-2 mr-4 md:my-0 ">
            <Button 
                onClick={() => toggleTheme()}
                className={`${themes[formattedTheme].secondary} flex items-center flex-col rounded-md p-2 w-full md:w-auto  ${formattedTheme === dark && 'outline outline-2 outline-blue-500'}`}
            >
                <div className={`${themes[formattedTheme].primary} flex items-center rounded h-32 md:w-48`}>
                    <div className="w-full">
                        <div className="flex flex-row items-center w-full animate-pulse p-1.5">
                            <div className="h-6 w-6 bg-neutral-400 rounded-full pr-6" />
                            <div className="h-2 bg-neutral-400 rounded-full w-full ml-4" />
                        </div>
                        <div className="flex flex-col items-center w-full animate-pulse px-1.5 py-2">
                            <div className="h-2 bg-neutral-400 rounded-full w-full mb-1.5" />
                            <div className="h-2 bg-neutral-400 rounded-full  w-full " />
                        </div>
                        <div className="flex flex-row items-center w-full animate-pulse px-1.5 py-2">
                            <div className="h-2 bg-neutral-400 rounded-full w-full mr-1" />
                            <div className="h-2 bg-neutral-400 rounded-full w-full ml-1" />
                        </div>
                    </div>
                </div>
            </Button>
            <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">
                {theme}
            </p>
        </div>
    )
}
