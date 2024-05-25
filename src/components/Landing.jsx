import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Header from './Header'

export default function Landing() {
    return (
        <AnimatePresence>
            <motion.div className='divide-y divide-solid divide-neutral-300 dark:divide-neutral-700'>
                <div className='max-w-screen-sm w-full h-full mt-2 mb-44 md:mb-10 md:mt-32 p-4 md:p-0 font-display '>
                    <Header />
                    <h1 className='text-md font-display font-semibold text-neutral-800 dark:text-neutral-200 mt-16'>
                        (Basic) Hyperlinked
                    </h1>
                    <p className='mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
                        A home for collecting and sharing the most precious hyperlinks.
                        Found an interesting link? Save it here. Share it with friends.
                        Explore interesting links shared by others. No sign-up required.
                    </p>
                    <h1 className='mt-8 text-md font-display font-semibold text-neutral-800 dark:text-neutral-200'>
                        About
                    </h1>
                    <p className='mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
                        Built for personal usage, designed with personal preferences. Bare-featured, minimal <s>boring</s> interface.
                        Auto-detect input content type. Render links with page metadata. Keyboard-first design. Animated appropriately.
                        Loads fast (citation needed). Works offline, though all you're really going be doing is look at the link. No onboarding. No tracking. No ads, ever. No BS.
                    </p>
                    <h1 className='mt-8 text-md font-display font-semibold text-neutral-800 dark:text-neutral-200'>
                        Join
                    </h1>
                    <p className='mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
                        The product is free to use. However, no new features, bug fixes, or any meaningful support will be guaranteed.
                        The codebase is under 2000 lines and I'd like to keep it that way. After all, this is a product for myself.
                    </p>
                    <a
                        href="/links"
                        className='w-full text-sm font-medium text-neutral-500 dark:text-neutral-400 underline underline-offset-4 flex flex-row items-center justify-end mt-10 md:mt-4 ' >
                        Check out some cool links
                        <ArrowRightIcon className='ml-1' />
                    </a>
                </div>
                <div className='p-4 pt-8 md:pt-6 m-4 md:m-0 md:mt-9'>
                    <div className='text-sm text-neutral-500 flex w-full justify-between'>
                        <p className='italic'>v.0.01</p>
                        <div className='flex flex-row'>
                            <a href="https://www.github.com" target='_blank'>
                                Github
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
