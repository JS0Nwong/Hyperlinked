import { TabList, Tab } from "@headlessui/react"
import { PersonIcon, UploadIcon, BlendingModeIcon } from "@radix-ui/react-icons"

export default function Panel() {
    const tabNames = [
        {
            key: 'account',
            name: 'Account',
            icon: <PersonIcon className="mr-2 text-neutral-500"/>
        },
        {
            key: 'appearance',
            name: 'Appearance',
            icon: <BlendingModeIcon className="mr-2 text-neutral-500"/>
        },
        {
            key: 'import',
            name: 'Import/Export',
            icon: <UploadIcon className="mr-2 text-neutral-500"/>
        }
    ]
    return (
        <TabList
            className=' flex flex-col items-start font-display font-medium text-sm mr-8'
        >
            {tabNames.map((tabName, index) => (
                <Tab
                    key={index}
                    className='flex items-center w-full text-left text-neutral-800 dark:text-neutral-200 rounded-md mb-2 font-semibold data-[selected]:bg-neutral-200 dark:data-[selected]:bg-neutral-700 pr-32 py-2 pl-4 focus:outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800'
                >
                    {tabName.icon} {tabName.name}
                </Tab>
            ))}
        </TabList>
    )
}
