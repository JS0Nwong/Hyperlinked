import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SavedLinks from './SavedLinks'
import Header from './Header'
import CreateBookmarkForm from './CreateBookmarkForm'
import Searchbar from './Searchbar'
import AddGroup from './AddGroup'
import Folder from './Folder'
import { colors } from '../utils/colors'

import { useBoundStore } from '../utils/storeBinder'
import { PlusIcon, CaretSortIcon, FileIcon } from '@radix-ui/react-icons'
import useSearch from '../utils/hooks/useSearch'


export default function LinksDisplay() {
  const [folderName, setFolderName] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [openCreateGroup, setOpenCreateGroup] = useState(false)
  const [focused, setFocused] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')


  const { getFilteredData, sortAlphabetically } = useSearch()
  const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks }))

  const keys = Object.keys(bookmarks)
  const filteredBookmarks = useMemo(() => getFilteredData(query), [bookmarks, query])

  const handleOpenFolder = (nameofFolder) => {
    setFolderName([...folderName, nameofFolder])
  }

  return (
    <>
      <div className='max-w-screen-sm w-full h-full mt-2 mb-28 md:mb-10 md:mt-32 p-4 md:p-0 font-display overflow-visible'>
        <Header />
        <Searchbar />
        <div className='flex flex-row w-full justify-between items-center mt-6'>
          <h1 className='text-lg font-display font-semibold text-neutral-800 dark:text-neutral-200'>
            Your Links{folderName.length !== 0
              ? folderName.map((nameOfFolder, index) => (
                <a
                  key={nameOfFolder}
                  href={`/links/${nameOfFolder}`}
                  className='text-md'
                >
                  {` > `} <span className='dark:text-neutral-200 text-neutral-800 dark:hover:text-neutral-300 hover:text-neutral-500'>
                    {nameOfFolder}
                  </span>
                </a>
              ))
              : ''}
          </h1>
          <div className='flex flex-row items-center'>
            <button className='mr-2' onClick={() => sortAlphabetically()}><CaretSortIcon /></button>
            <div className='h-4 w-px bg-neutral-300' />
            <button className='mx-2' onClick={() => setOpenCreateGroup(!openCreateGroup)}><FileIcon /></button>
            <button onClick={() => setOpenForm(!openForm)}><PlusIcon /></button>
          </div>
        </div>
        <AnimatePresence>
          {keys?.map((key, index) => (
            key === 'uncategorized' ?
              bookmarks.uncategorized.saved.map((bookmark, index) => (
                <SavedLinks
                  key={index}
                  data={bookmark}
                  index={index}
                  focused={focused}
                  setFocused={setFocused}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              ))
              :
              <button
                key={key}
                className={`w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors rounded py-3 px-4 mt-2 flex items-center justify-between`}
                onClick={() => handleOpenFolder(key)}
              >
                <div className='flex flex-row items-center'>
                  <div className={`w-2 h-2 rounded-full mr-2 bg-red-300/35 border ${colors[bookmarks[key].properties.color]} bg-opacity-35`} />
                  <p className='text-sm font-medium'>{key}</p>
                </div>
                <p className='text-neutral-500 text-xs '>{bookmarks[key].saved?.length} items</p>
              </button>
          ))}
        </AnimatePresence>
      </div>
      {openForm &&
        <CreateBookmarkForm
          isOpen={openForm}
          onClose={() => setOpenForm(false)}
        />}
      {openCreateGroup &&
        <AddGroup
          isOpen={openCreateGroup}
          onClose={() => setOpenCreateGroup(false)}
        />
      }
    </>
  )
}
