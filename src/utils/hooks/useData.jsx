import { validateUrl } from "../validateURL"
import { detectContentType } from "../detectContentType";
import { useBoundStore } from '../../utils/storeBinder'
import toast from 'react-hot-toast';

export default function useData() {
    const { setBookmarks, currentFolderDirectory } = useBoundStore((state) => ({
        setBookmarks: state.setBookmarks,
        currentFolderDirectory: state.currentFolderDirectory,
    }))

    const extractCode = (clipboard) => {
        // Regex to match code block with optional language identifier
        const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/;
    
        // Execute the regex to extract code
        const match = codeBlockRegex.exec(clipboard);
    
        // If a match is found, return the extracted code trimmed of any leading/trailing whitespace
        if (match) {
            return match[1].trim();
        }
    
        // If no match is found, return the original clipboard text trimmed
        return clipboard.trim();
    };

    const handleCodeSnippet = (clipboard, language) => {
        const parsedCode = extractCode(clipboard);
        const isCode = {
            favIcon: '',
            description: language,
            link: parsedCode,
            dateAdded: new Date().toDateString().slice(4, 10),
            isCode: true,
        }
        const folderName = currentFolderDirectory
        setBookmarks(isCode, folderName);
    }

    const handleSubmit = async (clipboard) => {
        const content = clipboard.trim()
        const title = document.getElementById('title-input')?.value.trim()
        const folderName = currentFolderDirectory

        if (!content) {
            toast.error('Enter a url', {
                icon: <div className="w-1 h-1 bg-yellow-500" />,
            });
            return;
        }
        const contentType = detectContentType(content);
        const isNotLink = {
            favIcon: '',
            description: '',
            link: content,
            dateAdded: new Date().toDateString().slice(4, 10),
            isCode: false,
        }
        try {
            if (contentType === 'link') {
                const formattedUrl = await validateUrl(content);
                const response = await fetch(`http://localhost:8000?url=${encodeURIComponent(formattedUrl)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch metadata');
                }
                const res = await response.json();
                setBookmarks(res, folderName);
            } else if (['rgb', 'hex', 'plain-text'].includes(contentType)) {
                setBookmarks(isNotLink, folderName);
            } else {
                toast.error("Couldn't detect content type ☹", {
                    icon: <div className="w-1 h-1 rounded-full bg-yellow-500" />,
                })
                return false;
            }
            return true;
        } catch (error) {
            return false; // Return false in case of any error
        }

    }
    return { handleSubmit, handleCodeSnippet }
}
