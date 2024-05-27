export const useDatastore = (set, get) => ({
  bookmarks: { uncategorized: [] },
  snackbarMessage: "",
  setBookmarks: (bookmarks, title) => {
    set((state) => ({
      bookmarks: {
        uncategorized: [...state.bookmarks.uncategorized, bookmarks],
      },
    }));
  },
  setSnackbarMessage: (message) => {
    set({ snackbarMessage: message });
  },
  createNewFolder: (name) => {
    set((state) => ({
      bookmarks: {
        [name]: [],
        ...state.bookmarks,
      },
    }));
  },
});
