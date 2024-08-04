import { useNavigate } from "react-router"
import { useHotkeys } from "react-hotkeys-hook"
import toast from 'react-hot-toast';

import LinksDisplay from "../components/Links/LinksDisplay"
import LinksDisplayCard from "../components/Links/LinksDisplayCard";
import Menubar from "../components/Static/Menubar"

import useData from "../utils/hooks/useData"
import { useBoundStore } from "../utils/storeBinder"
import { detectCodeLike } from "../utils/detectCodeLike";

export default function Links() {
    const navigate = useNavigate()
    const { handleSubmit, handleCodeSnippet } = useData()

    const {
        bookmarks,
        setCurrentFolderDirectory,
        currentFolderDirectory,
        isSuperuserView,
        isListView,
        isGridView,
    } = useBoundStore((state) => ({
        bookmarks: state.bookmarks,
        currentFolderDirectory: state.currentFolderDirectory,
        setCurrentFolderDirectory: state.setCurrentFolderDirectory,
        isSuperuserView: state.isSuperuserView,
        isListView: state.isListView,
        isGridView: state.isGridView,
    }))
    const keys = Object.keys(bookmarks)
    const index = keys.indexOf(currentFolderDirectory)

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
        const isCode = detectCodeLike(clipboard)
        if (isCode[0].type === 'code') {
            console.log(isCode[0].language)
            handleCodeSnippet(clipboard, isCode[0].language)
            toast.success(`Inserted code snippet`, {
                icon: <div className="w-1 h-1 bg-green-500 rounded-full" />
            })
            return
        } 
        if (clipboard !== '') {
            const arr = clipboard.split('\n')
            const promises = await Promise.all(arr.map(async (item) => {
                return await handleSubmit(item)
            }))
            const allSucceess = promises.every((promise) => promise === true)
            if (allSucceess) {
                const length = clipboard.split('\n').length
                toast.success(`Inserted ${length} item(s)`, {
                    icon: <div className="w-1 h-1 bg-green-500 rounded-full" />
                })
            } else {
                toast.error('Error inserting items', {
                    icon: <div className="w-1 h-1 bg-red-500 rounded-full" />
                })
            }
        }
    })
    useHotkeys('1,2,3,4,5,6,7,8,9', (e, handler) => {
        const index = parseInt(handler.keys) - 1
        if (index < keys.length) {
            setCurrentFolderDirectory(keys[index])
            navigate(`/links/${keys[index]}`)
        }
    })

    return (
        <div className='h-full min-h-max w-full flex flex-col items-center justify-center '>
            <Menubar />
            <div
                className={`${isGridView ? 'md:px-12 md:my-12' : 'max-w-[704px] md:p-0 md:my-24'} 
                w-full h-full my-2 p-4 font-display overflow-visible`}
            >
                {isListView && <LinksDisplay />}
                {isGridView && <LinksDisplayCard />}
                {/* {isSuperuserView && <SuperuserView />} */}
            </div>
            <div className='bg-gradient-to-t dark:from-[#121212] from-white w-full h-32 hidden md:block md:fixed bottom-0 select-none pointer-events-none' />
        </div>
    )
}
