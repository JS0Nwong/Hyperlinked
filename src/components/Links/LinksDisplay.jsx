import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil1Icon, TrashIcon, CopyIcon, MoveIcon, SymbolIcon } from '@radix-ui/react-icons'

import SavedLinks from './SavedLinks'
import CreateBookmarkForm from './CreateBookmarkForm'
import CreateFolder from './CreateFolder'
import Searchbar from './Searchbar'
import ContextMenu from './ContextMenu'
import CodeBlock from './CodeBlock'
import Toast from '../Toast'

import { useBoundStore } from '../../utils/storeBinder'
import useContextMenu from '../../utils/hooks/useContextMenu'

export default function LinksDisplay() {
  const [focused, setFocused] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [contextMenuIndex, setContextMenuIndex] = useState(0)

  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const {
    handleDeleteFolder,
    handleSubmenuClick,
    handleCopy,
    handleChanges,
    handleEdit,
    handleOpenCodeBlockModal,
    contextMenu,
    setContextMenu,
    editIndex,
    copiedIndex,
    isEditing
  } = useContextMenu()

  const {
    bookmarks,
    openCreateGroup,
    openCreateFolder,
    openCodeBlockModal,
    codeSnippet,
    codeLanguage,
    setOpenCreateGroup,
    setOpenCreateFolder,
    setOpenCodeBlockModal,
    currentFolderDirectory,
  } = useBoundStore((state) => ({
    bookmarks: state.bookmarks,
    openCreateGroup: state.openCreateGroup,
    openCreateFolder: state.openCreateFolder,
    openCodeBlockModal: state.openCodeBlockModal,
    codeSnippet: state.codeSnippet,
    codeLanguage: state.codeLanguage,
    setOpenCodeBlockModal: state.setOpenCodeBlockModal,
    setOpenCreateFolder: state.setOpenCreateFolder,
    setOpenCreateGroup: state.setOpenCreateGroup,
    currentFolderDirectory: state.currentFolderDirectory,
  }))

  const keys = Object.keys(bookmarks)
  // const filteredBookmarks = useMemo(() => getFilteredData(query), [bookmarks, query])

  const contextMenuRef = useRef(null)

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
      <div className='flex flex-row w-full justify-between items-center mt-2 md:my-4'>
        <Searchbar />
      </div>
      <div className='flex flex-col w-full divide-y divide-neutral-300/50 dark:divide-neutral-700/50 '>
        <div className='w-full flex  justify-between my-4 text-xs font-medium text-neutral-500 dark:text-neutral-400'>
          <h1 className='tracking-tight mx-4'>Title</h1>
          <h1 className='tracking-tight mx-4'>Created at</h1>
        </div>
        <div
          id="user-saved-links-wrapper"
          className='relative'
        // className='relative gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6' 
        >
          <AnimatePresence>
            {bookmarks[currentFolderDirectory]?.saved.map((bookmark, index) => (
              <SavedLinks
                key={index}
                data={bookmark}
                index={index}
                edit={editIndex === index}
                handleChanges={handleChanges}
                copy={copiedIndex === index}
                focused={focused}
                setFocused={setFocused}
                setHovered={setHovered}
                onContext={(e) => handleOnContextMenu(e, index)}
                handleOpenModal={handleOpenCodeBlockModal}
              />
            ))}
            {isEditing &&
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className='h-full backdrop-blur-sm absolute top-0 left-0 w-full z-[1]'
              />}
          </AnimatePresence>
        </div>
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
      {openCodeBlockModal &&
        <CodeBlock
          isOpen={openCodeBlockModal}
          onClose={() => setOpenCodeBlockModal(false)}
          code={codeSnippet}
          language={codeLanguage}
        />
      }
      <ContextMenu
        x={contextMenu.position.x}
        y={contextMenu.position.y}
        isToggled={contextMenu.isToggled}
        buttons={[
          { text: 'Copy', onClick: () => handleCopy(contextMenuIndex), icon: <CopyIcon className='mr-2 ' />, keyboardShortcut: 'Ctrl, C', isSpacer: false, submenu: false, },
          { text: 'Edit', onClick: () => handleEdit(contextMenuIndex), icon: <Pencil1Icon className='mr-2 ' />, keyboardShortcut: 'Ctrl, E', isSpacer: false, submenu: false, },
          { text: 'Refetch', onClick: () => console.log('Refetch Data'), icon: <SymbolIcon className='mr-2 ' />, keyboardShortcut: 'Ctrl, R', isSpacer: false, submenu: false, },
          { text: 'Delete', onClick: () => handleDeleteFolder(contextMenuIndex), icon: <TrashIcon className='mr-2 ' />, isSpacer: false, submenu: false, },
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
