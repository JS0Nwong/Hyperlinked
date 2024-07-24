import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileTextIcon, CheckIcon } from '@radix-ui/react-icons'
import LinkPreview from './LinkPreview'

export default function SavedLinks({
    data,
    index,
    edit,
    handleChanges,
    copy,
    focused,
    setFocused,
    hovered,
    setHovered,
    onContext,
}) {
    const displayLink = data.link?.replace(/^(?:https?:\/\/)?(?:www\.)?(.*?)(?:\/.*?)?$/i, "$1")
    const favIcon = data?.favIcon
    const description = data?.description
    const title = data?.title
    const isLink = description || favIcon
    const isRGB = data.link.trim()?.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/)
    const isHex = data.link.trim()?.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    const [copied, setCopied] = useState(false)

    const handleClick = () => {
        navigator.clipboard.writeText(data.link)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }
    return (
        <>
            {isLink
                ? <motion.a
                    title={data.link}
                    onMouseEnter={() => setFocused(index)}
                    onTap={() => setFocused(index)}
                    onFocus={() => {
                        setFocused(index)
                        setHovered(true)
                    }}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    onContextMenu={onContext}
                    href={data.link}
                    target='_blank'
                    aria-label='links'
                    className='select-none w-full first:mt-4 py-3 md:px-0.5 md:py-2.5 rounded-md flex flex-row justify-between items-center text-ellipsis relative focus:outline-none'
                >
                    {copy && <div className='absolute z-10 flex items-center'>
                            <motion.div
                                key="checkIcon"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-4 h-4 mx-2 md:ml-4 text-neutral-900 dark:text-neutral-50"
                            >
                                <CheckIcon />
                            </motion.div>
                            <motion.p
                                key="copied"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='relative w-full text-neutral-800 text-sm font-medium mx-1 dark:text-neutral-200 text-nowrap text-ellipsis overflow-hidden '
                            >
                                Copied
                            </motion.p>
                        </div>
                    }
                    <img 
                        className="w-4 h-4 mx-2 md:ml-4" 
                        src={favIcon} 
                    />
                    {edit
                        ? <input
                            autoFocus={edit}
                            defaultValue={title}
                            placeholder=''
                            autoComplete='off'
                            type='text'
                            className='w-full text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 text-nowrap text-ellipsis overflow-hidden'
                            
                        />
                        : <p
                            className='w-full text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 text-nowrap text-ellipsis overflow-hidden'
                            id='site-title'>
                            {title}
                        </p>}
                    <p className='text-neutral-500 mx-2 md:mr-4 text-xs w-full max-w-[150px] truncate text-end'>
                        {displayLink}
                    </p>
                    {!edit && focused === index ? (
                        <motion.div
                            layout={true}
                            transition={{
                                duration: 0.1,
                                ease: "linear",
                            }}
                            className="absolute w-full h-full bg-neutral-400/15 dark:bg-neutral-400/10 rounded-lg p-5 md:p-2 z-0"
                            layoutId="highlight"
                        />
                    ) : null}

                </motion.a>
                : 
                <motion.div
                    title={data.link}
                    onMouseEnter={() => setFocused(index)}
                    onTap={() => setFocused(index)}
                    onFocus={() => {
                        setFocused(index)
                        setHovered(true)
                    }}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    onContextMenu={onContext}
                    onClick={edit ? null : handleClick}
                    className='cursor-pointer select-none w-full first:mt-4 py-3 md:px-0.5 md:py-2.5 rounded-md flex flex-row justify-between items-center text-ellipsis relative focus:outline-none'
                >
                    <AnimatePresence>
                        {(copy || copied) && <div className='absolute z-10 flex items-center'>
                            <motion.div
                                key="checkIcon"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-4 h-4 mx-2 md:ml-4 text-neutral-900 dark:text-neutral-50"
                            >
                                <CheckIcon />
                            </motion.div>
                            <motion.p
                                key="copied"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='relative w-full text-neutral-800 text-sm font-medium mx-1 dark:text-neutral-200 text-nowrap text-ellipsis overflow-hidden '
                            >
                                Copied
                            </motion.p>
                        </div>}
                        {isHex || isRGB
                            ? <motion.div
                                key='colorCircle'
                                initial={{ opacity: 1 }}
                                animate={{ opacity: copy || copied ? 0 : 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className='w-4 h-4 mx-2 md:ml-4 rounded-full'
                                style={{ backgroundColor: displayLink }}
                            />
                            : <motion.div
                                key="fileIcon"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: copy || copied ? 0 : 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-4 h-4 mx-2 md:ml-4 dark:text-neutral-200 text-neutral-900"
                            >
                                <FileTextIcon />
                            </motion.div>
                        }
                    </AnimatePresence>
                    {edit
                        ? <input
                            onBlur={(e) => handleChanges(e.target.value, index)}
                            onFocus={(e) => e.target.select()}
                            autoFocus={edit}
                            defaultValue={displayLink}
                            placeholder=''
                            autoComplete='off'
                            type='text'
                            id='site-title'
                            className='w-full text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 text-nowrap text-ellipsis overflow-hidden focus:outline-none'
                        />
                        :
                        <motion.p
                            className='relative w-full text-neutral-800 text-sm font-medium mx-1 dark:text-neutral-200 text-nowrap text-ellipsis overflow-hidden '
                        >
                            <AnimatePresence>
                                <motion.span
                                    key="displayLink"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: copy || copied ? 0 : 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.33, ease: "easeInOut" }}
                                >
                                    {displayLink}
                                </motion.span>
                            </AnimatePresence>
                        </motion.p>
                    }


                    {!edit && focused === index ? (
                        <motion.div
                            layout={true}
                            transition={{
                                duration: 0.1,
                                ease: "linear",
                            }}
                            className="absolute w-full h-full bg-neutral-400/15 dark:bg-neutral-400/10 rounded-lg p-5 md:p-2 z-0"
                            layoutId="highlight"
                        />
                    ) : null}
                </motion.div>
            }
        </>
    )
}
