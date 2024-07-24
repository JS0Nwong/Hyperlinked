import { 
    TabPanels, 
    TabPanel, 
} from "@headlessui/react"

import TabHeader from "./TabHeader"
import Account from "./Account"
import Appearance from "./Appearance"
import Import from "./Import"

export default function Tab() {
    return (
        <TabPanels className='w-full max-w-[1100px]'>
            <TabPanel>
                <div className="divide-y divide-neutral-300 dark:divide-neutral-800">
                    <TabHeader
                        title="Account"
                        description="Update your account settings. Set your preferred language and timezone."
                    />
                   <Account />
                </div>
            </TabPanel>

            <TabPanel>
                <div className="divide-y divide-neutral-300 dark:divide-neutral-800">
                    <TabHeader
                        title="Appearance"
                        description="Choose how Hyperlinked looks and feels for you."
                    />
                   <Appearance />
                </div>
            </TabPanel>

            <TabPanel>
                <div className="divide-y divide-neutral-300 dark:divide-neutral-800">
                    <TabHeader
                        title="Import/Export"
                        description="Import or export your links from other sources."
                    />
                    <Import />
                </div>
            </TabPanel>
        </TabPanels>
    )
}
