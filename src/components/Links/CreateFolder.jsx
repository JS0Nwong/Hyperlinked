import { useState } from 'react'
import { Fieldset, Field, Input, Label, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useBoundStore } from '../../utils/storeBinder'
import { colors as colorObj } from '../../utils/colors'
import SelectComponent from '../Select'

export default function CreateFolder({ isOpen, onClose }) {
    const { createNewFolder } = useBoundStore((state) => ({ createNewFolder: state.createNewFolder }))
    const handleSubmit = () => {
        const name = document.getElementById('folder-name-input').value.trim()
        if (!name) return
        createNewFolder(name, color)
        onClose()
    }

    const [color, setColor] = useState(Object.keys(colorObj)[0])

    return (
        <Transition appear show={isOpen}>
            <Dialog as="div" className="relative focus:outline-none z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform-[scale(75%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className="w-full max-w-md rounded-xl bg-neutral-100 dark:bg-white/5 p-6 backdrop-blur-2xl border dark:border-neutral-800 border-neutral-300">
                                <DialogTitle as="h3" className="text-base/7 font-medium text-neutral-800 dark:text-white">
                                    Create a new folder
                                </DialogTitle>
                                <Fieldset className="mt-4 w-full">
                                    <Field className='mt-2'>
                                        <Label className="text-sm/6 font-medium text-neutral-600 dark:text-neutral-400">Name</Label>
                                        <Input
                                            autoFocus={true}
                                            required={true}
                                            autoComplete='off'
                                            type='text'
                                            id='folder-name-input'
                                            placeholder='Example Name'
                                            className='font-display mt-1 w-full border border-neutral-300 dark:border-neutral-700 rounded focus:outline-none dark:focus:border-neutral-200 focus:border-neutral-800 py-1.5 px-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
                                            name="link"
                                        />
                                    </Field>
                                    <Field className='mt-2'>
                                        <label className='text-sm/6 font-medium text-neutral-600 dark:text-neutral-400'>Color</label>
                                        <SelectComponent
                                            obj={colorObj}
                                            type={"colorSelect"}
                                            defaultValue={color}
                                            handler={setColor}
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
                                            className='mt-4 bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800 rounded py-2 px-4 text-sm font-medium hover:opacity-90 transition duration-100 ease-out border border-neutral-500'>
                                            Add
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
