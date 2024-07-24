import { Label } from "@headlessui/react"

export default function FormLabel({ label }) {
    return (
        <Label className="text-sm/6 font-medium text-neutral-800 dark:text-neutral-200">
            {label}
        </Label>
    )
}
