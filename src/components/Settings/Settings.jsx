import { TabGroup } from "@headlessui/react"
import Panel from "./Panel"
import Tab from "./Tab"

export default function SettingsPanel() {
    return (
        <div className="relative w-full font-display">
            <TabGroup className='flex mt-10 w-full'>
                <Panel />
                <Tab />
            </TabGroup>
        </div>
    )
}