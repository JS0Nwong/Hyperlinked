import {
    Input,
    Field,
    Fieldset
} from "@headlessui/react"
import FormLabel from "../FormLabel"
import FormDescription from "../FormDescription"

export default function Account() {
    const handleAccountSubmit = () => {
        // handle account submit
    }

    return (
        <div className="my-6">
            <Fieldset>
                <Field className='my-6'>
                    <FormLabel label="Email" />
                    <Input
                        id='email'
                        type="email"
                        autoCapitalize="off"
                        autoComplete="off"
                        placeholder="example@hyperlinked.com"
                        className={
                            'mt-3 max-w-[650px] block w-full rounded-md border-none bg-black/5 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-white placeholder:text-black/55 dark:placeholder-white/55 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed'
                        }
                    />
                    <FormDescription description='A confirmation email will be sent to the new email address.' />
                </Field>

                <Field className='my-4'>
                    <FormLabel label="Name" />
                    <Input
                        id='name'
                        type="text"
                        placeholder="John Doe"
                        autoCapitalize="off"
                        autoComplete="off"
                        className={
                            'mt-3 max-w-[450px] block w-full rounded-md border-none bg-black/5 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-white placeholder:text-black/55 dark:placeholder-white/55 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed'
                        }
                    />
                    <FormDescription description='Use your real name so people will recognize you.' />
                </Field>

                <button
                    className='p-2 bg-neutral-800 dark:bg-neutral-200 w-36 mt-8 font-medium text-sm rounded-md text-neutral-200 dark:text-neutral-800 '>
                    Update account
                </button>
            </Fieldset>
        </div>
    )
}
