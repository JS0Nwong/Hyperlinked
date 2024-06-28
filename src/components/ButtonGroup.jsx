import LinkPreview from "./LinkPreview"
import { useBoundStore } from "../utils/storeBinder"

export default function ButtonGroup() {
  return (
    <div className='flex flex-row items-center'>
      <LinkPreview />
    </div>
  )
}
