import { Checkbox as Check } from "@headlessui/react"
import { useState } from "react"
import { CheckIcon } from "@radix-ui/react-icons"

export default function Checkbox() {
    const [enabled, setEnabled] = useState(false)

    return (
        <Checkbox
            checked={enabled}
            onChange={setEnabled}
            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
        >
            {/* Checkmark icon */}
            <CheckIcon
                className="group-data-[checked]:opacity-100 stroke-white opacity-0"
            />
        </Checkbox>
    )
}
