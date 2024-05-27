import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SavedLinks from './SavedLinks'
import Header from './Header'
import CreateBookmarkForm from './CreateBookmarkForm'
import Searchbar from './Searchbar'
import AddGroup from './AddGroup'
import ButtonGroup from './ButtonGroup'

import { useBoundStore } from '../utils/storeBinder'
import { PlusIcon, CaretSortIcon, FileIcon } from '@radix-ui/react-icons'
import useSearch from '../utils/hooks/useSearch'

export default function LinksDisplay() {
  const [openForm, setOpenForm] = useState(false)
  const [openCreateGroup, setOpenCreateGroup] = useState(false)
  const [focused, setFocused] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')

  const { getFilteredData } = useSearch()
  const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks }))

  const keys = Object.keys(bookmarks)
  const filteredBookmarks = useMemo(() => getFilteredData(query), [bookmarks, query])

  return (
    <>
      <div className='max-w-screen-sm w-full h-full mt-2 mb-28 md:mb-10 md:mt-32 p-4 md:p-0 font-display overflow-visible'>
        <Header />
        <Searchbar />
        <h1 className='flex flex-row w-full justify-between items-center text-lg font-display font-semibold text-neutral-800 dark:text-neutral-200 mt-6'>
          Your Links
          <div className='flex flex-row items-center'>
            <button className='mr-2' onClick={() => setOpenForm(!openForm)}><CaretSortIcon /></button>
            <div className='h-4 w-px bg-neutral-300'/>
            <button className='mx-2' onClick={() => setOpenCreateGroup(!openCreateGroup)}><FileIcon /></button>
            <button onClick={() => setOpenForm(!openForm)}><PlusIcon /></button>
          </div>
        </h1>
        <AnimatePresence>

          {keys?.map((key, index) => (
            key === 'uncategorized' ?
              bookmarks[key].map((bookmark, index) => (
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
                className='w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors rounded-md py-3 px-4 mt-2 flex items-center justify-between'>
                <p className='text-sm font-medium'>{key}</p> <p className='text-neutral-500 text-xs '>{bookmarks[key].length} items</p>
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
