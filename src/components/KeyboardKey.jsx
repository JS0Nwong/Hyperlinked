export default function KeyboardKey({ char }) {
    return (
        <kbd className="select-none text-sm rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-[3px] px-[8px] mx-1">
            {char}
        </kbd>
    )
}
