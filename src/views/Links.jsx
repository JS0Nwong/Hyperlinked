import { useNavigate } from "react-router"
import { useHotkeys } from "react-hotkeys-hook"
import toast from 'react-hot-toast';

import LinksDisplay from "../components/Links/LinksDisplay"
import Searchbar from "../components/Links/Searchbar"
import Menubar from "../components/Static/Menubar"

import useData from "../utils/hooks/useData"
import { useBoundStore } from "../utils/storeBinder"

export default function Links() {
    const navigate = useNavigate()
    const { handleSubmit } = useData()

    const {
        bookmarks,
        setCurrentFolderDirectory,
        currentFolderDirectory
    } = useBoundStore((state) => ({
        bookmarks: state.bookmarks,
        currentFolderDirectory: state.currentFolderDirectory,
        setCurrentFolderDirectory: state.setCurrentFolderDirectory,
    }))
    const keys = Object.keys(bookmarks)
    const index = keys.indexOf(currentFolderDirectory)

    const activeElement = document.activeElement === document.getElementById('searchbar') ||
        document.activeElement === document.getElementById('url-input') ||
        document.activeElement === document.getElementById('title-input');
    useHotkeys('left', () => {
        if (index === 0) {
            setCurrentFolderDirectory(keys[keys.length - 1])
            navigate(`/links/${keys[keys.length - 1]}`)
        } else {
            setCurrentFolderDirectory(keys[index - 1])
            navigate(`/links/${keys[index - 1]}`)
        }
    })
    useHotkeys('right', () => {
        if (index === keys.length - 1) {
            setCurrentFolderDirectory(keys[0])
            navigate(`/links/${keys[0]}`)
        } else {
            setCurrentFolderDirectory(keys[index + 1])
            navigate(`/links/${keys[index + 1]}`)
        }
    })
    useHotkeys('ctrl+f', (e) => {
        e.preventDefault()
        document.getElementById('searchbar').focus()
    })
    useHotkeys('esc', (e) => {
        document.activeElement.blur()
    })
    useHotkeys('ctrl+v', async (e) => {
        e.preventDefault()
        const clipboard = await navigator.clipboard.readText()
        const length = clipboard.split('\n').length
        if (clipboard !== '') {
            const arr = clipboard.split('\n')
            const promises = arr.map(async (url) => {
                await handleSubmit(currentFolderDirectory, url)
            })
            const res = Promise.all(promises)

            // if(res) {
            //     toast.success(`Inserted ${length} item(s)`, {
            //         icon: <div className="w-1 h-1 bg-green-500 rounded-full" />
            //     })
            // } else {
            //     toast.error('Error inserting items', {
            //         icon: <div className="w-1 h-1 bg-red-500 rounded-full" />
            //     })
            // }
        }
    })

    return (
        <div className='h-full min-h-max w-full flex flex-col items-center justify-center '>
            <Menubar />
            <div className='max-w-[704px] w-full h-full my-2 md:my-24 p-4 md:p-0 font-display overflow-visible'>
                <Searchbar />
                <LinksDisplay />
            </div>
            <div className='bg-gradient-to-t dark:from-[#121212] from-white w-full h-32 hidden md:block md:fixed bottom-0 select-none pointer-events-none'/>
        </div>
    )
}
