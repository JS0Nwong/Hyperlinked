import { validateUrl } from "../validateURL"
import { detectContentType } from "../detectContentType";
import { useBoundStore } from '../../utils/storeBinder'
import { getFunctions, httpsCallable } from 'firebase/functions'

import toast from 'react-hot-toast';
import { auth } from "../firebase";

export default function useData() {
    const { bookmarks, setBookmarks, currentFolderDirectory, updateBookmarks } = useBoundStore((state) => ({
        bookmarks: state.bookmarks,
        setBookmarks: state.setBookmarks,
        currentFolderDirectory: state.currentFolderDirectory,
        updateBookmarks: state.updateBookmarks,
    }))
    const functions = getFunctions();   
    const createLinkBookmark = httpsCallable(functions, 'createLinkBookmark');

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
            title: content,
            link: content,
            dateAdded: new Date().toDateString().slice(4, 10),
            isCode: false,
        }
        try {
            if (contentType === 'link') {
                const formattedUrl = await validateUrl(content);
                const isLinkSkeleton = {
                    favIcon: '',
                    description: '',
                    title: '',
                    link: formattedUrl,
                    dateAdded: new Date().toDateString().slice(4, 10),
                    isCode: false,
                };
                setBookmarks(isLinkSkeleton, folderName);
                const response = await createLinkBookmark({ 
                    url: formattedUrl,
                    uid: auth.currentUser.uid || null,
                    folderName: folderName,
                })
                console.log(response)
                updateBookmarks(formattedUrl, response.data, folderName);
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
            // console.log(error);
            // const retryFetch ={
            //     favIcon: '',
            //     link: formattedUrl,
            //     dateAdded: new Date().toDateString().slice(4, 10),
            //     isCode: false,
            //     retryFetch: true,  
            // }
            // setBookmarks(retryFetch, folderName);
            return false; // Return false in case of any error
        }

    }
    return { handleSubmit, handleCodeSnippet }
}
