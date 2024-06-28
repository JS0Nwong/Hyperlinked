export const useDatastore = (set, get) => ({
  bookmarks: {
    uncategorized: {
      saved: [],
      properties: {
        visibility: true,
        color: 'White',
      }
    }
  },
  snackbarMessage: "",
  setBookmarks: (bookmarks, title, folderName) => {
    set((state) => ({
      bookmarks: {
        ...state.bookmarks,
        [folderName]: {
          saved: [...state.bookmarks[folderName].saved, bookmarks],
          properties: {
            ...state.bookmarks[folderName].properties,
          }
        },
      },
    }));
  },
  setSnackbarMessage: (message) => {
    set({ snackbarMessage: message });
  },
  createNewFolder: (name, color) => {
    set((state) => ({
      bookmarks: {
        [name]: {
          saved: [],
          properties: {
            visibility: true,
            color: color || null,
          }
        },
        ...state.bookmarks,
      },
    }));
  },
});

