import { ArrowDownIcon, ArrowUpIcon, ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { MdKeyboardCommandKey } from "react-icons/md";
import hljs from "highlight.js";
import KeyboardKey from "../KeyboardKey"
import useUserAgent from "../../utils/hooks/useUserAgent";

export default function HelpInfo() {
  const device  = useUserAgent()
  const html = hljs.highlight('```html\n <h1>Hello world!\</h1>\n```', { language: 'html' }).value

  return (
    <div className='flex flex-col'>
      <h1 className="font-semibold text-neutral-800 dark:text-neutral-200">Input</h1>
      <p className="mb-6 mt-2 text-neutral-500 font-medium tracking-loose">
        Paste your text into the input.
        It will always be filtering, but that shouldn't stop you.
        When you press Enter, you'll create a new bookmark.
        You can also insert multiple links at once by copying and pasting them with each link on a new line.
        In the future, we might have a dedicated, global search command menu.
      </p>
      <h1 className="font-semibold text-neutral-800 dark:text-neutral-200">Content Types</h1>
      <p className="mb-6 mt-2 text-neutral-500  font-medium tracking-loose">
        You can insert any URL.
        It does not need to start with https but does need to have a domain extension (.com, .net, ...) at the end.
        Color formats will also be parsed (HEX, RGB, …) and displayed appropriately.
        Falls back to text.
        Supports code snippets with syntax highlighting. 
        Prefix your code snippet with <code>```</code> followed by the language of the code directly after.
        Suffix your code snippet with <code>```</code> to end the code block.
        For example, this will render the code with HTML syntax highlighting.
        <pre className="w-full bg-neutral-100 dark:bg-neutral-900  mt-4 rounded-md p-2 md:p-4">
          <code
          dangerouslySetInnerHTML={
            { __html: html }
          }/> 
        </pre>
      </p>
      <h1 className="font-semibold text-neutral-800 dark:text-neutral-200">Metadata</h1>
      <p className="mb-6 mt-2 text-neutral-500 font-medium tracking-loose">
        Links will try to render their respective page title and favicon.
        Fetching these is asynchronous and happens on the server.
        This means that on a successful response, the meta-data will propagate to the database even if you were to close your session after inserting the link.
      </p>
      <h1 className="font-semibold text-neutral-800 dark:text-neutral-200">Shortcuts</h1>
      <ul className="list-disc ml-4 mb-6 mt-2 text-neutral-500  font-medium tracking-loose">
        <li>
          Numeric keys
          <KeyboardKey char={'1'} />
          <KeyboardKey char={'2'} />
          <KeyboardKey char={'3'} />
          (...) to navigate between folders.
        </li>
        <li>
          <div className="flex mt-1.5">
            <kbd className="select-none rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-.5 px-1 mx-1 flex items-center">
              <ArrowLeftIcon />
            </kbd>
            <kbd className="select-none rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-.5 px-1 mx-1 flex items-center">
              <ArrowRightIcon />
            </kbd>
            to sequentially navigate between folders
          </div>
        </li>
        <li>
          <div className="flex mt-1.5">
            <kbd className="select-none rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-.5 px-1 mx-1 flex items-center">
              {device === 'windows'
                ? <kbd className="select-none rounded text-sm bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 px-1">
                  CTRL
                </kbd>
                : <MdKeyboardCommandKey />}
            </kbd>
            <kbd className="select-none rounded text-sm bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-.5 px-2 mx-1 flex items-center">
              F
            </kbd>
            to focus the root input.
          </div>
        </li>
        <li>
          <div className="flex mt-1.5">
            <kbd className="select-none rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-.5 px-1 mx-1 flex items-center">
              <ArrowUpIcon />
            </kbd>
            <kbd className="select-none rounded bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-.5 px-1 mx-1 flex items-center">
              <ArrowDownIcon />
            </kbd>
            to move between rows.
          </div>
        </li>
      </ul>
      <p className="mb-6 mt-2 text-neutral-500 font-medium tracking-loose">
        You can also right click on a bookmark to perform the actions above.
        Moving a bookmark to a different group is also possible from the context menu.
      </p>
    </div>
  )
}
