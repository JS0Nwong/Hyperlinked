import { useState } from "react"
import { Button } from "@headlessui/react"
import { DotsVerticalIcon, CopyIcon, FileTextIcon } from "@radix-ui/react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { colors } from "../../utils/colors"

export default function Card({
  data
}) {
  const displayLink = data.link?.replace(/^(?:https?:\/\/)?(?:www\.)?(.*?)(?:\/.*?)?$/i, "$1")
  const favIcon = data?.favIcon
  const description = data?.description
  const title = data?.title
  const isLink = description || favIcon
  const isRGB = data.link.trim()?.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/)
  const isHex = data.link.trim()?.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className='flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm'>
      <div
        id='card-content'
        className='h-full cursor-pointer relative group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(isRGB || isHex) && <div className='w-full h-44 rounded-t-lg' style={{ backgroundColor: data.link.trim() }} />}
        {isLink && <img src={favIcon} alt={displayLink} className='w-full h-44 rounded-t-lg' />}
        {!isLink && (!isRGB && !isHex) &&
          <div
            className={`w-full h-44 rounded-t-lg flex items-center justify-center`}
          >
            <FileTextIcon className="text-neutral-800 dark:text-neutral-200 size-8" />
          </div>
        }
        <AnimatePresence>
          <motion.div
            key='card'
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='absolute top-0 left-0 w-full h-full bg-black/20 rounded-t-lg flex items-center justify-center'
          >
            <CopyIcon className="size-8" />
          </motion.div>
          <Button
            key={data.link}
            className='group-hover:flex hidden absolute top-2 right-2 p-2 rounded-full '
          >
            <DotsVerticalIcon className="size-4" />
          </Button>
        </AnimatePresence>
      </div>

      <div
        id='card-title'
        className='px-4 mt-2 h-full w-full'
      >
        {(isRGB || isHex) && <p className='text-lg font-medium text-neutral-900 dark:text-neutral-100 truncate'>
          {data.link}
        </p>}
        {isLink && <p className='text-lg font-medium text-neutral-900 dark:text-neutral-100 truncate'>
          {data.title}
        </p>}
        {!isLink && (!isRGB && !isHex) && <p className='text-lg font-medium text-neutral-900 dark:text-neutral-100 truncate'>
          {data.link}
        </p>}
      </div>
      
      <div
        id='card-description'
        className='px-4 mt-0 mb-4 text-sm text-neutral-400 dark:text-neutral-500 h-full'
      >
        {isLink && <p className='text-sm text-neutral-400 dark:text-neutral-500 truncate'>
          {displayLink}
        </p>}
        <p className='text-sm text-neutral-400 dark:text-neutral-500 truncate mt-3'>
          {data?.dateAdded}
        </p>
      </div>
    </div>
  )
}
