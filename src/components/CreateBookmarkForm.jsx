import { Fieldset, Field, Input, Label, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import SelectComponent from './Select'
import { useBoundStore } from '../utils/storeBinder'
import { Cross2Icon } from '@radix-ui/react-icons'

export default function CreateBookmarkForm({ isOpen, onClose }) {
    const { setBookmarks } = useBoundStore()
    const handleSubmit = async () => {
        function formatURL(url) {
            // Check if the URL starts with 'http://' or 'https://'
            if (!/^https?:\/\//i.test(url)) {
                // If not, prepend 'https://'
                url = 'https://' + url;
            }

            // Check if the URL already contains 'www.'
            const urlObj = new URL(url);
            if (!/^www\./i.test(urlObj.hostname)) {
                // If not, prepend 'www.' to the hostname
                urlObj.hostname = 'www.' + urlObj.hostname;
            }

            return urlObj.toString();
        }
        const url = document.getElementById('url-input').value
        const title = document.getElementById('title-input').value.trim()

        if (!url) {
            alert('Please enter a URL');
            return;
        }
        const formattedUrl = formatURL(url);

        try {
            const response = await fetch(`http://localhost:8000?url=${encodeURIComponent(formattedUrl)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch metadata');
            }

            const res = await response.json();
            setBookmarks(res);
            onClose()

        } catch (error) {
            console.error(error);
            alert('Error fetching metadata');
        }
    }

    return (
        <Transition appear show={isOpen}>
            <Dialog as="div" className="relative focus:outline-none" onClose={onClose}>
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className="w-full max-w-lg rounded-xl bg-neutral-100 dark:bg-white/5 p-6 backdrop-blur-2xl">
                                <DialogTitle as="h3" className="text-base/7 font-medium text-neutral-800 dark:text-white">
                                    Add a link
                                </DialogTitle>
                                <Fieldset className="mt-4 w-full">
                                    <Field>
                                        <Label className="text-sm/6 font-medium text-neutral-600 dark:text-neutral-400">Group</Label>
                                        <div className='flex flex-row items-end'>
                                            <SelectComponent />
                                            <button className="py-[9.5px] px-2 rounded-r text-neutral-800 dark:text-neutral-200  bg-neutral-200 dark:bg-neutral-700 hover:bg-red-600 transition-all">
                                                <Cross2Icon />
                                            </button>
                                        </div>
                                    </Field>
                                    <div className='mt-6 mb-4 w-full h-px bg-neutral-800 dark:bg-neutral-700' />
                                    <Field className='mt-2'>
                                        <Label className="text-sm/6 font-medium text-neutral-600 dark:text-neutral-400">URL</Label>
                                        <Input
                                            required={true}
                                            autoComplete='off'
                                            type='text'
                                            id='url-input'
                                            placeholder='https://www.example.com'
                                            className='font-display mt-1 w-full border border-neutral-300 dark:border-neutral-700 rounded focus:outline-none dark:focus:border-neutral-200 focus:border-neutral-800 py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
                                            name="link"
                                        />
                                    </Field>
                                    <Field className='mt-4'>
                                        <Label className="text-sm/6 font-medium text-neutral-600 dark:text-neutral-400 ">Link Title</Label>
                                        <Input
                                            autoComplete='off'
                                            type='text'
                                            id='title-input'
                                            placeholder='My Link Name'
                                            className='font-display mt-1 w-full border border-neutral-300 dark:border-neutral-700 rounded focus:outline-none dark:focus:border-neutral-200 focus:border-neutral-800 py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
                                            name="title"
                                        />
                                    </Field>
                                    <div className='mt-2 w-full flex flex-row justify-end'>
                                        <button
                                            onClick={onClose}
                                            id="cancel-button"
                                            className='mt-4  mr-3 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200  rounded py-2 px-4 text-sm font-medium transition-colors'>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className='mt-4 bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800 rounded py-2 px-4 text-sm font-medium'>
                                            Save
                                        </button>
                                    </div>
                                </Fieldset>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
