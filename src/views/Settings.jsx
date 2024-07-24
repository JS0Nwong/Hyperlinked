import SettingsPanel from '../components/Settings/Settings'
import Header from '../components/Static/Header'
import Menubar from '../components/Static/Menubar'

export default function Settings() {
    return (
        <div className='h-full min-h-max w-full flex flex-col'>
            <Menubar />
            <div className=' w-full h-full font-display overflow-visible divide-y divide-neutral-300 dark:divide-neutral-800 py-8 px-10'>
                <div className='mb-8'>
                    <h1 className='text-neutral-800 dark:text-neutral-200 font-semibold text-2xl/8'>Settings</h1>
                    <span className='text-neutral-500 tracking-tight font-medium text-base/8'>Manage your account settings and set e-mail preferences.
                    </span>
                </div>
                <SettingsPanel />
            </div>
        </div>)
}