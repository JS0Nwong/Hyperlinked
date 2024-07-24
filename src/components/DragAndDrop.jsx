import { IoCloudUpload } from "react-icons/io5";

export default function DragAndDrop({
    dragOverHandler,
    dropHandler,
    fileUploadHandler
}) {
    return (
        <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e)}
            onClick={(e) => fileUploadHandler(e)}
            name='file'
            className="h-72 md:h-52 w-full md:max-w-[750px] border border-dashed rounded-md border-neutral-600 flex flex-col items-center justify-center cursor-pointer"
        >
            <IoCloudUpload className="text-2xl text-neutral-600 dark:text-neutral-300" />
            <p className="text-sm text-neutral-500 my-1 font-medium">Drag and drop or click to upload</p>
            <p className="text-xs text-neutral-400 font-medium">
                .CSV or .HTML
            </p>
        </div>
    )
}
