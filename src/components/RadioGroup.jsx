import { 
    RadioGroup as Group, 
    Radio, 
    Field, 
    Label 
} from "@headlessui/react"
import { CheckIcon } from "@radix-ui/react-icons"

export default function RadioGroup({ array, selected, setSelected }) {
    return (
        <Group value={selected} onChange={setSelected} aria-label="Server size">
            {array.map((plan) => (
                <Field key={plan} className="flex items-center gap-2">
                    <Radio
                        value={plan}
                        className="group flex size-4 items-center justify-center rounded-full border bg-transparent border-neutral-500 dark:border-neutral-300"
                    >
                        <CheckIcon className="invisible size-3 rounded-full group-data-[checked]:visible text-neutral-800 dark:text-neutral-200 " />
                    </Radio>
                    <Label className='font-medium text-sm/6 text-neutral-800 dark:text-neutral-200 '>{plan}</Label>
                </Field>
            ))}
        </Group>
    )
}
