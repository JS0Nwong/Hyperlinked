import { validateUrl } from "../validateURL"
import { detectContentType } from "../detectContentType";
import { useBoundStore } from '../../utils/storeBinder'
import toast from 'react-hot-toast';

export default function useData() {
    const { setBookmarks, bookmarks } = useBoundStore((state) => ({
        bookmarks: state.bookmarks,
        setBookmarks: state.setBookmarks,
    }))

    const handleSubmit = async (folder, clipboard) => {
        const content = clipboard ?? document.getElementById('url-input').value
        const title = document.getElementById('title-input')?.value.trim()
        const folderName = folder

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
        }

        if (contentType === 'link') {
            try {
                const formattedUrl = await validateUrl(content);
                const response = await fetch(`http://localhost:8000?url=${encodeURIComponent(formattedUrl)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch metadata');
                }
                const res = await response.json();
                setBookmarks(res, title, folderName);
            } catch (error) {
                toast.error('Error saving link', {
                    icon: <div className="w-1 h-1 bg-red-500 rounded-full" />,
                });
            }
        } else if (contentType === 'rgb') {
            setBookmarks(isNotLink, title, folderName);
        } else if (contentType === 'hex') {
            setBookmarks(isNotLink, title, folderName);
        } else if (contentType === 'plain-text') {
            setBookmarks(isNotLink, title, folderName);
        } else {
            toast.error("Couldn't detect content type ☹", {
                icon: <div className="w-1 h-1 rounded-full bg-yellow-500" />,
            })
        }
    }
    return { handleSubmit }
}
