export default function TabHeader({ title, description }) {
    return (
        <div>
            <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                {title}
            </h1>
            <p className="text-neutral-400 dark:text-neutral-500 font-normal text-sm/6">
                {description}
            </p>
        </div>
    )
}