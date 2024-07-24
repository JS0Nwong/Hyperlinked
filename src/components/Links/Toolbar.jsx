import { useBoundStore } from "../../utils/storeBinder"
import { PlusIcon, CaretSortIcon, FileIcon, Pencil1Icon } from '@radix-ui/react-icons'

export default function Toolbar() {
    const {
        setOpenCreateGroup,
        setOpenCreateFolder,
        currentFolderDirectory,
    } = useBoundStore((state) => ({
        currentFolderDirectory: state.currentFolderDirectory,
        setOpenCreateGroup: state.setOpenCreateGroup,
        setOpenCreateFolder: state.setOpenCreateFolder,
    }))

    return (
        <>
            <button className='group text-lg font-display font-semibold text-neutral-800 dark:text-neutral-200 truncate flex items-center'>
                {currentFolderDirectory}
                <Pencil1Icon className="invisible group-hover:visible text-neutral-800 dark:text-neutral-200 ml-2"/>
            </button>
            <div className='flex flex-row items-center'>
                <button className='mr-2 dark:text-neutral-200 text-neutral-800' onClick={() => sortAlphabetically()}><CaretSortIcon /></button>
                <div className='h-4 w-px bg-neutral-300 dark:bg-neutral-600' />
                <button className='mx-2 dark:text-neutral-200 text-neutral-800' onClick={() => setOpenCreateGroup()}><FileIcon /></button>
                <button className='dark:text-neutral-200 text-neutral-800' onClick={() => setOpenCreateFolder()}><PlusIcon /></button>
            </div>
        </>
    )
}
