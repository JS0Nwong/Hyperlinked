import { Description } from "@headlessui/react"

export default function FormDescription({description}) {
  return (
    <Description className="text-xs my-2 text-black/50 dark:text-white/50 ">
        {description}
    </Description>
)
}
