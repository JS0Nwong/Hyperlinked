import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import Card from './Card'
import CardsToolbar from './CardsToolbar'
import Toast from '../Toast'

import { useBoundStore } from '../../utils/storeBinder'
import useSearch from '../../utils/hooks/useSearch'
import useContextMenu from '../../utils/hooks/useContextMenu'

export default function LinksDisplayCard() {
    const [focused, setFocused] = useState(null);
    const [hovered, setHovered] = useState(false)
    const [contextMenuIndex, setContextMenuIndex] = useState(0)

    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')
    const { getFilteredData, sortAlphabetically, searchResults } = useSearch()
    const { handleDeleteFolder, handleSubmenuClick, handleCopy, handleChanges, handleEdit, contextMenu, setContextMenu, editIndex, copiedIndex, isEditing } = useContextMenu()
    const {
        bookmarks,
        openCreateGroup,
        openCreateFolder,
        setOpenCreateGroup,
        setOpenCreateFolder,
        currentFolderDirectory,
    } = useBoundStore((state) => ({
        bookmarks: state.bookmarks,
        openCreateGroup: state.openCreateGroup,
        openCreateFolder: state.openCreateFolder,
        currentFolderDirectory: state.currentFolderDirectory,
        setOpenCreateFolder: state.setOpenCreateFolder,
        setOpenCreateGroup: state.setOpenCreateGroup,
    }))

    const keys = Object.keys(bookmarks)
    return (
        <>
            <div className='flex flex-row w-full justify-between items-center'>
                <CardsToolbar />
            </div>
            <div
                id="user-saved-links-wrapper"
                className='relative gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4'
            >
                <AnimatePresence>
                    {bookmarks[currentFolderDirectory].saved.map((bookmark, index) => (
                        <Card
                            key={index}
                            data={bookmark}
                            index={index}
                            edit={editIndex === index}
                            handleChanges={handleChanges}
                            copy={copiedIndex === index}
                            focused={focused}
                            setFocused={setFocused}
                            hovered={hovered}
                            setHovered={setHovered}
                            onContext={(e) => handleOnContextMenu(e, index)}
                        />
                    ))}

                </AnimatePresence>
            </div>

            <Toast />
        </>
    )
}
