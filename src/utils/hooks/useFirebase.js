import { db, auth } from "../firebase";
import { doc, setDoc, collection, addDoc, getDocs, updateDoc, arrayUnion, } from "firebase/firestore";

export default function useFirebase() {
  const user = auth?.currentUser;

  // Read operations
  const fetchFolders = async () => {

  };

  // Post operations
  const createNewFolder = () => {

  };
  const createNewBookmark = async (folderId, bookmark) => {

  };

  // Update operations
  const editBookmark = async (folderId, bookmarkId, bookmark) => {
    
  };

  // Delete operations
  const deleteBookmark = async (folderId, bookmarkId) => {
    
  };
  const deleteFolder = async (folderId) => {

  };

  return {
    createNewFolder,
    createNewBookmark,
    editBookmark,
    deleteBookmark,
    deleteFolder,
  };
}
