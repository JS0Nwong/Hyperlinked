import {
    Field,
    Fieldset
} from "@headlessui/react"
import FormLabel from "../FormLabel"
import FormDescription from "../FormDescription"
import RadioGroup from "../RadioGroup"
import DragAndDrop from "../DragAndDrop"
import Table from "../DataTable/Table"
import { columns } from "../DataTable/columns"

import { useState } from "react";
import { useBoundStore } from "../../utils/storeBinder";
import { parser } from "../../utils/parser"

export default function Import() {
    const { setParsedBookmarks, parsedBookmarks } = useBoundStore((state) => ({
        setParsedBookmarks: state.setParsedBookmarks,
        parsedBookmarks: state.parsedBookmarks
    }))
    
    const plans = ['HTML', 'CSV']
    const [selected, setSelected] = useState(plans[0])
    const [fileName, setFileName] = useState('')
    const [showTable, setShowTable] = useState(false)

    const fileUploadHandler = (e) => {
        const readFile = function (e) {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const filtered = parser(contents)
                setParsedBookmarks(filtered)
            }
            reader.readAsText(file)
            setFileName(file.name)
            setShowTable(true)
        }
        const fileInput = document.createElement("input")
        fileInput.type = 'file'
        fileInput.accept = '.html,.csv'
        fileInput.style.display = 'none'
        fileInput.onchange = readFile
        document.body.appendChild(fileInput)
        fileInput.click()
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    const dropHandler = (e) => {
        e.preventDefault()
        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file" && 
                    (item.type === 'text/html' || item.type === 'text/csv')) {
                    const file = item.getAsFile();
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const contents = e.target.result;
                        const filtered = parser(contents)
                        setParsedBookmarks(filtered)
                    }
                    reader.readAsText(file)                    
                    setFileName(file.name)
                    setShowTable(true)
                }
            })
        } else {
            [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`file[${i}].name = ${file.name}`)
            })
        }
    }

    const handleExport = () => {
        const format = selected

        if (format === 'HTML') {
            console.log('Exporting as HTML')
        }
        else {
            console.log('Exporting as CSV')
        }
    }

    const handleImport = () => {

    }

    return (
        <div className="my-6">
            <Fieldset>
                <Field className='my-6'>
                    <FormLabel label="Import" />
                    <FormDescription
                        description="Import your links from other sources. Simply export your existing links from your brower's bookmark manager and upload the file here. You'll have a chance to review your links before they are imported."
                    />
                    <div className="wrapper">
                        {!showTable ? 
                            <DragAndDrop
                                dragOverHandler={dragOverHandler}
                                dropHandler={dropHandler}
                                fileUploadHandler={fileUploadHandler}
                            />
                        : 
                            <>
                                <div className="file-info-wrapper flex w-full justify-between mt-4">
                                    <p className="text-sm text-end text-neutral-800 dark:text-neutral-200 font-medium">
                                        Uploaded file: <span className="text-neutral-400">{fileName || 'N/A'}</span>
                                    </p>
                                </div>
                                <Table />
                            </>
                        }
                    </div>
                    <div className="flex mt-8">
                        <button
                            onClick={() => handleImport()}
                            className='p-2 bg-neutral-800 dark:bg-neutral-200 w-28 my-4 font-medium text-sm rounded-md text-neutral-200 dark:text-neutral-800 '>
                            Import
                        </button>
                        <button
                            onClick={() => handleImport()}
                            className='ml-4 p-2 border border-netural-300 hover:bg-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700 transition-colors  w-28 my-4 font-medium text-sm rounded-md text-neutral-800 dark:text-neutral-200 '>
                            Delete all
                        </button>
                    </div>
                </Field>
                <Field>
                    <FormLabel label="Export" />
                    <FormDescription
                        description="Export your links to a file. You can use this file to import your links into another service. If you are importing your links into a browser, export your links as an HTML file."
                    />
                    <div className="flex flex-col">
                        <RadioGroup
                            array={plans}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                    <button
                        onClick={() => handleExport()}
                        className='p-2 bg-neutral-800 dark:bg-neutral-200 w-28 mt-8 font-medium text-sm rounded-md text-neutral-200 dark:text-neutral-800 '>
                        Export
                    </button>
                </Field>
            </Fieldset>
        </div>
    )
}
