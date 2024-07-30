import hljs from 'highlight.js'
import { useState } from 'react'
import { Button, Dialog, DialogPanel, Transition, } from '@headlessui/react'
import { CopyIcon, Pencil1Icon, DotsHorizontalIcon, CheckIcon } from '@radix-ui/react-icons'
import { motion, AnimatePresence } from 'framer-motion'

export default function CodeBlock({ isOpen, onClose, code, language }) {
    const highlightCode = hljs.highlight(code, { language: language }).value
    const [copied, setCopied] = useState(false)
    const handleClick = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    return (
        <Transition appear show={isOpen}>
            <Dialog as="div" className="relative focus:outline-none z-50" onClose={onClose}>
                <AnimatePresence>
                    <motion.div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                    <motion.div
                        key="code-block"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full  items-center justify-center p-4">
                            <DialogPanel className="relative w-full min-h-full max-w-3xl rounded-xl bg-neutral-100 dark:bg-neutral-900 p-4 py-8 backdrop-blur-2xl border dark:border-neutral-800 border-neutral-300">
                                <div className='absolute flex top-4 right-4 gap-2'>
                                    <Button 
                                        onClick={handleClick}
                                        className='p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-75'>
                                        {copied ? <CheckIcon /> : <CopyIcon />}
                                    </Button>
                                    <Button className='p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-75'>
                                        <Pencil1Icon />
                                    </Button>
                                    <Button className='p-2 rounded-md bg-neutral-200 dark:bg-neutral-800  text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-75'>
                                        <DotsHorizontalIcon />
                                    </Button>
                                </div>
                                <pre
                                    className='w-full h-full text-neutral-800 dark:text-neutral-200 text-sm font-medium mx-2 mb-8  overflow-x-auto'
                                    dangerouslySetInnerHTML={{ __html: highlightCode }}
                                />
                                <h1 className='absolute bottom-4 right-4 text-neutral-400 dark:text-neutral-500 font-mono select-none pointer-events-none text-sm'>{language}</h1>
                            </DialogPanel>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Dialog>
        </Transition>
    )
}
