import { useState } from "react"
import { Field, Fieldset } from "@headlessui/react"

import FormLabel from "../FormLabel"
import FormDescription from "../FormDescription"
import ThemeButton from "../ThemeButton"
import Select from "./Select"

import { useTheme } from "../../utils/context/ThemeProvider"

export default function Appearance() {
    const { darkMode, toggleTheme } = useTheme()

    const themes = ['Light', 'Dark', 'System']
    const fonts = ['Inter', 'Roboto', 'Arial', 'Sans-serif']
    const displays = ['List', 'Comfortable Grid', 'Compact Grid']

    const [selectedFont, setSelectedFont] = useState(fonts[0])
    const [selectedDisplay, setSelectedDisplay] = useState(displays[0])

    const handleAppearanceSubmit = () => {

    }

    return (
        <div className="my-6">
            <Fieldset>
                <Field className='my-6'>
                    <FormLabel label="Display" />
                    <FormDescription description='Set your preferred display format.' />
                    <Select
                        obj={displays}
                        defaultValue={selectedDisplay}
                        handler={setSelectedDisplay}
                        styling='w-full md:w-60 mb-3'
                    />
                </Field>
                <Field className='my-4'>
                    <FormLabel label="Font" />
                    <FormDescription description='Set the font that you want to use throughout Hyperlinked.' />
                    <Select
                        obj={fonts}
                        defaultValue={selectedFont}
                        handler={setSelectedFont}
                        styling='w-full md:w-60 mb-3'
                    />
                </Field>
                <Field className='my-4'>
                    <FormLabel label="Theme" />
                    <FormDescription
                        description='Choose how Hyperlinked looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes. Selections are applied immediately and saved automatically.'
                    />
                    <div className="flex w-full flex-col md:flex-row">
                        {themes.map(theme => (
                            <ThemeButton
                                key={theme}
                                theme={theme}
                            />
                        ))}
                    </div>
                </Field>
                <button
                    className='p-2 bg-neutral-800 dark:bg-neutral-200 w-40 mt-8 font-medium text-sm rounded-md text-neutral-200 dark:text-neutral-800 '>
                    Update appearance
                </button>
            </Fieldset>
        </div>
    )
}
