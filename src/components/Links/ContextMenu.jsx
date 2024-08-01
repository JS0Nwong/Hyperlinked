import { useState } from "react"
import { colors } from '../../utils/colors'
import { useBoundStore } from "../../utils/storeBinder";

export default function ContextMenu({
    rightClickItem,
    x,
    y,
    isToggled,
    buttons,
    contextMenuRef,
    folders,
    onSubmenuClick,
    currentFolderDirectory,
}) {
    const [hoveredButton, setHoveredButton] = useState(null);
    const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks}))
    return (
        <menu
            style={{
                top: y + 12 + 'px',
                left: x + 2 + 'px',
            }}
            ref={contextMenuRef}
            className={isToggled
                ? 'absolute z-50 backdrop-blur-sm bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-md px-1.5 py-1.5 flex flex-col items-start w-44'
                : 'hidden invisible'
            }>

            {buttons.map((button, index) => {
                function handleClick(e) {
                    e.stopPropagation()
                    button.onClick(e, rightClickItem)
                }
                return (
                    <div
                        key={index}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={(e) => {
                            // Check if the mouse is still within the context menu or the submenu
                            const relatedTarget = e.relatedTarget;
                            if (relatedTarget && contextMenuRef.current) {
                                return;
                            }
                            setHoveredButton(null);
                        }}
                        className='relative w-full tracking-tight'
                    >
                        <button
                            onClick={ handleClick }
                            key={index}
                            className='flex items-center justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400  hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5 rounded w-full text-left'
                        >
                            <div className='flex items-center'>
                                <span>{button.icon}</span>
                                <span>{button.text}</span>
                            </div>
                            {button.keyboardShortcut &&
                                <div className='flex items-center'>
                                    <kbd className='mr-0.5 text-xs select-none rounded bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 py-0.5 px-1.5'>
                                        {button.keyboardShortcut.slice(0, 4)}
                                    </kbd>
                                    <kbd className='text-xs select-none rounded bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 py-0.5 px-1.5'>
                                        {button.keyboardShortcut.slice(5)}
                                    </kbd>
                                </div>
                            }
                        </button>

                        {(hoveredButton === index && folders.length > 1 ) && (
                            <div
                                onMouseEnter={() => setHoveredButton(index)}
                                onMouseLeave={(e) => {
                                    // Check if the mouse is still within the context menu or the submenu
                                    const relatedTarget = e.relatedTarget;
                                    if (relatedTarget && contextMenuRef.current) {
                                        return;
                                    }
                                    setHoveredButton(null);
                                }}
                                className={`tracking-tight absolute top-0 left-full ml-2 z-50 shadow-md ${button.submenu ? 'block' : 'hidden'}`}
                                style={{
                                    top: 0,
                                    left: '100%',
                                }}
                            >
                                {/* submenu */}
                                <ul className=' bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md shadow-md px-1.5 py-1.5 flex flex-col items-start min-w-32 w-full'>
                                    {folders.map((folder, index) => (
                                        currentFolderDirectory === folder ? null : <li
                                            key={index}
                                            onClick={() => onSubmenuClick(folder)}
                                            className='cursor-pointer flex items-center text-sm font-medium text-neutral-500 dark:text-neutral-400  hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5 rounded w-full'
                                        >
                                            <div className={`w-4 h-4 ${colors[bookmarks[folder].properties?.color]} rounded-full`}/>
                                            <p className="mx-2">{folder}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )
            })}
        </menu>
    )
}
