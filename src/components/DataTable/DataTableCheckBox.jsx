import { Checkbox } from "@headlessui/react"
import { CheckIcon } from "@radix-ui/react-icons"

export default function DataTableCheckBox({checked, onCheckedChange}) {
    return (
        <Checkbox
            checked={checked}
            onChange={onCheckedChange}
            className="cursor-pointer group block size-4 rounded border border-neutral-800 dark:border-neutral-200 data-[checked]:bg-black dark:data-[checked]:bg-white"
        >
            {/* Checkmark icon */}
            <CheckIcon
                className="group-data-[checked]:opacity-100 group-data-[checked]:stroke-neutral-300 dark:group-data-[checked]:stroke-neutral-600 opacity-0"
            />
        </Checkbox>
    )
}
