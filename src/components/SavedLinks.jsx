import { motion } from 'framer-motion'
import LinkPreview from './LinkPreview'

export default function SavedLinks({ data, index, focused, setFocused, hovered, setHovered }) {
    const displayLink = data.link.replace(/^(?:https?:\/\/)?(?:www\.)?(.*?)(?:\/)?$/i, "$1")
    const favIcon = data.favIcon
    const description = data.description
    const title = data.title

    return (
        <>
            <motion.a
                onMouseEnter={() => setFocused(index)}
                onTap={() => setFocused(index)}
                onFocus={() => {
                    setFocused(index)
                    setHovered(true)
                }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                href={data.link}
                target='_blank'
                className='mt-5 w-full py-3 md:py-5 rounded-md h-7 flex flex-row justify-between items-center text-ellipsis relative focus:outline-none'>
                <img className="w-4 h-4 mr-2 ml-2 md:ml-4" src={favIcon} />
                <p className='w-full text-neutral-800 text-sm font-medium ml-1 mr-1 dark:text-neutral-200 text-nowrap text-ellipsis overflow-hidden' >
                    {data.description}</p>
                <p className='text-neutral-500 mx-2 md:mr-4 text-xs' >
                    {displayLink}
                </p>
                {focused === index ? (
                    <motion.div
                        layout={true}
                        transition={{
                            duration: 0.1,
                            ease: "linear",
                        }}
                        className="absolute w-full h-full bg-neutral-400/15 dark:bg-neutral-400/10 rounded-lg p-5 md:p-6 z-0"
                        layoutId="highlight"
                    />
                ) : null}
                {focused === index && hovered ? (
                    <LinkPreview
                        img={favIcon}
                        title={title}
                        description={description}
                    />
                ) : null}
            </motion.a>
        </>
    )
}
