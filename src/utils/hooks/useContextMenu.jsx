import toast from 'react-hot-toast'
import { useBoundStore } from '../storeBinder'
import { useState } from 'react'

export default function useContextMenu() {
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    isToggled: false
  })
  const [editIndex, setEditIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    bookmarks,
    currentFolderDirectory,
    deleteBookmark,
    moveBookmark,
    editBookmark,
    setOpenCodeBlockModal,
    setCodeSnippet,
    setCodeLanguage,
  } = useBoundStore((state) => ({
    bookmarks: state.bookmarks,
    currentFolderDirectory: state.currentFolderDirectory,
    deleteBookmark: state.deleteBookmark,
    moveBookmark: state.moveBookmark,
    editBookmark: state.editBookmark,
    setOpenCodeBlockModal: state.setOpenCodeBlockModal,
    setCodeSnippet: state.setCodeSnippet,
    setCodeLanguage: state.setCodeLanguage,
  }))

  const handleDeleteFolder = (contextMenuIndex) => {
    deleteBookmark(currentFolderDirectory, contextMenuIndex)
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
    toast.success('Deleted bookmark ', {
      icon: <div className="w-1 h-1 rounded-full bg-green-500" />,
    })

  }

  const handleSubmenuClick = (folderName, contextMenuIndex) => {
    moveBookmark(currentFolderDirectory, folderName, contextMenuIndex)
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
    toast.success('Moved bookmark to ' + folderName, {
      icon: <div className="w-1 h-1 rounded-full bg-green-500" />,
    })
  }

  const handleCopy = (contextMenuIndex) => {
    setCopiedIndex(contextMenuIndex);
    navigator.clipboard.writeText(bookmarks[currentFolderDirectory].saved[contextMenuIndex].link);
    setTimeout(() => {
      setCopiedIndex(null)
    }, 1000)
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
  }

  const handleChanges = (newTitle, index) => {
    newTitle.trim() && editBookmark(currentFolderDirectory, index, newTitle)
    setEditIndex(null);
    setIsEditing(false);
  }

  const handleEdit = (contextMenuIndex) => {
    setEditIndex(contextMenuIndex);
    setIsEditing(true);
    setContextMenu({ position: { x: 0, y: 0 }, isToggled: false });
  }

  const handleOpenCodeBlockModal = (code, langauge) => {
    setCodeSnippet(code)
    setCodeLanguage(langauge)
    setOpenCodeBlockModal(true)
  }

  return { 
    handleDeleteFolder, 
    handleSubmenuClick, 
    handleCopy, 
    handleChanges, 
    handleEdit,
    handleOpenCodeBlockModal, 
    contextMenu, 
    setContextMenu,
    editIndex,
    setEditIndex,
    copiedIndex,
    setCopiedIndex,
    isEditing,
  }
}
