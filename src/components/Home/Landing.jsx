import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Header from '../Static/Header'
import ButtonGroup from './ButtonGroup'

export default function Landing() {
    return (
        <AnimatePresence>
            <div className='flex flex-col w-full items-center'>
                <motion.div>
                    <div className='max-w-screen-sm w-full h-full mt-2 mb-4 md:mb-10 md:mt-32 p-4 md:p-0 font-display '>
                        <motion.div
                            className='flex flex-col'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5, ease: 'easeIn' }}
                        >
                            <Header />
                        </motion.div>
                        <motion.div
                            key='landing-text'
                            className=' flex flex-col'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5, ease: 'easeIn' }}
                        >
                            <h1 className='text-md font-display font-semibold text-neutral-800 dark:text-neutral-200 mt-16'>
                                (Basic) Hyperlinked
                            </h1>
                            <p className='mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
                                A home for collecting and sharing the most precious hyperlinks.
                                Found an interesting link? Save it here. Share it with friends.
                                Explore interesting links shared by others. No sign-up required.
                            </p>
                        </motion.div>
                        <motion.div
                            key='about-text'
                            className=' flex flex-col'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: 'easeIn' }}
                        >

                            <h1 className='mt-8 text-md font-display font-semibold text-neutral-800 dark:text-neutral-200'>
                                About
                            </h1>
                            <p className='mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
                                Built for personal usage, designed with personal preferences. Bare-featured, minimal <s>boring</s> interface.
                                Auto-detect input content type. Render links with page metadata. Keyboard-first design. Animated appropriately.
                                Loads fast (citation needed). Works offline, though all you're really going be doing is look at the link. No onboarding. No tracking. No ads, ever. No BS.
                            </p>
                        </motion.div>
                        <motion.div
                            key='join-text'
                            className=' flex flex-col'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5, ease: 'easeIn' }}
                        >

                            <h1 className='mt-8 text-md font-display font-semibold text-neutral-800 dark:text-neutral-200'>
                                Join
                            </h1>
                            <p className='mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
                                The product is free to use. However, no new features, bug fixes, or any meaningful support will be guaranteed.
                                The codebase is under 2000 lines and I'd like to keep it that way. After all, this is a product for myself.
                            </p>
                        </motion.div>
                        <motion.a
                            href="/links"
                            className='w-full text-sm font-medium text-neutral-500 dark:text-neutral-400 underline underline-offset-4 flex flex-row items-center justify-end mt-10 md:mt-4 '
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5, ease: 'easeIn' }}
                        >
                            Get Started
                            <ArrowRightIcon className='ml-1' />
                        </motion.a>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5, ease: 'easeIn' }}
                            className='my-8 h-px rounded-full w-full bg-gradient-to-r from-[#ffa8bd] via-purple-500 to-[#242acf]'
                        />
                    </div>
                    <motion.div
                        className='px-2 mx-4 md:mx-0 md:px-0 my-2'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5, ease: 'easeIn' }}
                    >
                        <div className='text-sm text-neutral-500 flex w-full justify-between'>
                            <p className='italic'>v.0.01</p>
                            <div className='flex flex-row'>
                                <a href="https://www.github.com" target='_blank'>
                                    Github
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                {/* <ButtonGroup /> */}
            </div>
        </AnimatePresence>
    )
}
