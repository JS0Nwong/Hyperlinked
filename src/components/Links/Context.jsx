import {
    Menu,
    Item,
    Separator,
    Submenu,
} from 'react-contexify'
import { colors } from '../../utils/colors'
import { useBoundStore } from "../../utils/storeBinder";
import { Pencil1Icon, TrashIcon, CopyIcon, MoveIcon, SymbolIcon } from '@radix-ui/react-icons'

export default function ContextMenu({ id, handleClick, showSubMenu, folders, buttons }) {
    const { bookmarks } = useBoundStore((state) => ({ bookmarks: state.bookmarks}))
    const icons = [ <CopyIcon />, <Pencil1Icon />, <SymbolIcon/>]
    return (
        <Menu
            id={id}
            className='backdrop-blur-sm bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-md px-1.5 py-1.5 flex flex-col items-start w-44'
        >
            {buttons.map((button, index) => (
                <Item
                    key={button}
                    className='flex items-center justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400  hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5 rounded w-full text-left'
                    id={button}
                    onClick={handleClick}
                >
                    <div className='flex items-center'>
                        <span className='mr-1.5'>{icons[index]}</span>
                        <span>{button}</span>
                    </div>
                </Item>
            ))}
           
            <Separator />
            <Item
                className='flex items-center justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400  hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5 rounded w-full text-left transition duration-100 ease-out'
                id='Delete' 
                onClick={handleClick}
            >
                    <div className='flex items-center'>
                        <span className='mr-1.5'><TrashIcon /></span>
                        <span>Delete</span>
                    </div>
            </Item>
            <Submenu
                label="Move to"
                arrow={<></>}
                className='flex items-center justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400  hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5 rounded w-full text-left transition duration-100 ease-out'
            >
                {folders.map((folder, index) => (
                    <Item
                        hidden
                        key={index}
                        className='flex items-center justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400  hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5 rounded w-full text-left'
                        id={folder}
                        onClick={handleClick}
                    >
                        <div className={`w-4 h-4 ${colors[bookmarks[folder].properties?.color]} rounded-full`} />
                        <p className="mx-2">{folder}</p>
                    </Item>
                ))}
            </Submenu>
        </Menu>
    )
}