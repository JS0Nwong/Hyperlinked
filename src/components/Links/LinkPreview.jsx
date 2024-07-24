import { motion } from 'framer-motion'

export default function LinkPreview({ img, title, description }) {
    return (
        <motion.div
            layout={true}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='hidden absolute -right-72 top-0 bg-neutral-100 dark:bg-neutral-800 z-50 rounded-lg p-3 lg:flex flex-col max-w-64 w-full drop-shadow-md'>
            <img className="rounded-sm" src={img} />
            <h6 className="mt-2 text-neutral-800 dark:text-neutral-200 font-medium">{title}</h6>
            <p className='line-clamp-2 text-xs text-neutral-500  mt-1'>
                {description}
            </p>
        </motion.div>
    )
}
