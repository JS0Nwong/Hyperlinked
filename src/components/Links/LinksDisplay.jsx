import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil1Icon, TrashIcon, CopyIcon, MoveIcon, SymbolIcon } from '@radix-ui/react-icons'

import SavedLinks from './SavedLinks'
import CreateBookmarkForm from './CreateBookmarkForm'
import CreateFolder from './CreateFolder'
import Toolbar from './Toolbar'
import ContextMenu from './ContextMenu'
import Toast from '../Toast'

import { useBoundStore } from '../../utils/storeBinder'
import useSearch from '../../utils/hooks/useSearch'
import toast from 'react-hot-toast'

export default function LinksDisplay() {
  const [focused, setFocused] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [contextMenuIndex, setContextMenuIndex] = useState(0)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const [editIndex, setEditIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);


  const { getFilteredData, sortAlphabetically, searchResults } = useSearch()

  const {
    bookmarks,
    openCreateGroup,
    openCreateFolder,
    setOpenCreateGroup,
    setOpenCreateFolder,
    currentFolderDirectory,
    deleteBookmark,
    moveBookmark,
    editBookmark,
  } = useBoundStore((state) => ({
    bookmarks: state.bookmarks,
    openCreateGroup: state.openCreateGroup,
    openCreateFolder: state.openCreateFolder,
    currentFolderDirectory: state.currentFolderDirectory,
    setOpenCreateFolder: state.setOpenCreateFolder,
    setOpenCreateGroup: state.setOpenCreateGroup,
    deleteBookmark: state.deleteBookmark,
    moveBookmark: state.moveBookmark,
    editBookmark: state.editBookmark,
  }))

  const keys = Object.keys(bookmarks)
  // const filteredBookmarks = useMemo(() => getFilteredData(query), [bookmarks, query])

  const contextMenuRef = useRef(null)
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    isToggled: false
  })
  const handleDeleteFolder = () => {
    deleteBookmark(currentFolderDirectory, contextMenuIndex)
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
    toast.success('Deleted bookmark ', {
      icon: <div className="w-1 h-1 rounded-full bg-green-500" />,
    })
    
  }

  const handleSubmenuClick = (folderName) => {
    moveBookmark(currentFolderDirectory, folderName, contextMenuIndex)
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
    toast.success('Moved bookmark to ' + folderName, {
      icon: <div className="w-1 h-1 rounded-full bg-green-500" />,
    })
  }

  const handleCopy = () => {
    setCopiedIndex(contextMenuIndex);
    navigator.clipboard.writeText(bookmarks[currentFolderDirectory].saved[contextMenuIndex].link);
    setTimeout(() => {
      setCopiedIndex(null)
    }, 1000)
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
  }

  const handleChanges = (newTitle, index) => {
    editBookmark(currentFolderDirectory, index, newTitle)
    setEditIndex(null);
  }

  const handleEdit = () => {
    setEditIndex(contextMenuIndex);
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
  }

  const handleOnContextMenu = (e, index) => {
    e.preventDefault()
    setContextMenuIndex(index)
    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect()
    const isLeft = e.clientX < window?.innerWidth / 2
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    let x
    let y = e.clientY + scrollTop


    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX + scrollLeft - contextMenuAttr.width
    }
    setContextMenu({
      position: {
        x,
        y,
      },
      isToggled: true
    })
  }

  useEffect(() => {
    function handler(e) {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
          setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
      }
  }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  })

  return (
    <>
      <div className='flex flex-row w-full justify-between items-center mt-6'>
        <Toolbar />
      </div>
      <div 
        id="user-saved-links-wrapper" 
      >
        <AnimatePresence>
          {bookmarks[currentFolderDirectory].saved.map((bookmark, index) => (
            <SavedLinks
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
      {openCreateFolder &&
        <CreateBookmarkForm
          isOpen={openCreateFolder}
          onClose={() => setOpenCreateFolder(false)}
        />}
      {openCreateGroup &&
        <CreateFolder
          isOpen={openCreateGroup}
          onClose={() => setOpenCreateGroup(false)}
        />
      }
      <ContextMenu
          x={contextMenu.position.x}
          y={contextMenu.position.y}
          isToggled={contextMenu.isToggled}
          buttons={[
            { text: 'Copy', onClick: () => handleCopy(), icon: <CopyIcon className='mr-2 ' />, keyboardShortcut: 'Ctrl, C', isSpacer: false, submenu: false, },
            { text: 'Edit', onClick: () => handleEdit(), icon: <Pencil1Icon className='mr-2 ' />, keyboardShortcut: 'Ctrl, E', isSpacer: false, submenu: false, },
            { text: 'Refetch', onClick: () => console.log('Refetch Data'), icon: <SymbolIcon className='mr-2 ' />, keyboardShortcut: 'Ctrl, R', isSpacer: false, submenu: false, },
            { text: 'Delete', onClick: () => handleDeleteFolder(), icon: <TrashIcon className='mr-2 ' />, isSpacer: false, submenu: false, },
            { text: 'Move To', onClick: () => null, icon: <MoveIcon className='mr-2 ' />, isSpacer: false, submenu: true, },
          ]}
          contextMenuRef={contextMenuRef}
          folders={keys}
          onSubmenuClick={handleSubmenuClick}
          currentFolderDirectory={currentFolderDirectory}
        />
      <Toast />
    </>
  )
}
