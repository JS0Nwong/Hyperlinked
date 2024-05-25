import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SavedLinks from './SavedLinks'
import Header from './Header'
import CreateBookmarkForm from './CreateBookmarkForm'
import Searchbar from './Searchbar'

import { useBoundStore } from '../utils/storeBinder'
import { PlusIcon } from '@radix-ui/react-icons'
import useSearch from '../utils/hooks/useSearch'

export default function LinksDisplay() {
  const [openForm, setOpenForm] = useState(false)
  const [focused, setFocused] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')

  const { getFilteredData } = useSearch()
  const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks }))

  const keys = Object.keys(bookmarks)
  const filteredBookmarks = useMemo(() => getFilteredData(query), [bookmarks, query])

  console.log(filteredBookmarks)

  return (
    <>
      <div className='max-w-screen-sm w-full h-full mt-2 mb-28 md:mb-10 md:mt-32 p-4 md:p-0 font-display overflow-visible'>
        <Header />
        <Searchbar />
        <h1 className='flex flex-row w-full justify-between items-center text-lg font-display font-semibold text-neutral-800 dark:text-neutral-200 mt-6'>
          Your Links
          <button onClick={() => setOpenForm(!openForm)}><PlusIcon /></button>
        </h1>
        <AnimatePresence>
          {keys?.map((key, index) => (
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
          ))}
        </AnimatePresence>
      </div>
      {openForm &&
        <CreateBookmarkForm
          isOpen={openForm}
          onClose={() => setOpenForm(false)}
        />}
    </>
  )
}
