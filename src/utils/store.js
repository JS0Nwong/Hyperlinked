export const useDatastore = (set, get) => ({
  bookmarks: {
    uncategorized: {
      saved: [],
      properties: {
        visibility: true,
        color: "White",
      },
    },
  },
  parsedBookmarks: [],
  setBookmarks: (bookmarks, folderName) => {
    set((state) => ({
      bookmarks: {
        ...state.bookmarks,
        [folderName]: {
          saved: [bookmarks, ...state.bookmarks[folderName].saved],
          properties: {
            ...state.bookmarks[folderName].properties,
          },
        },
      },
    }));
  },
  createNewFolder: (name, color) => {
    set((state) => ({
      bookmarks: {
        [name]: {
          saved: [],
          properties: {
            visibility: true,
            color: color || null,
          },
        },
        ...state.bookmarks,
      },
    }));
  },
  setParsedBookmarks: (bookmarks) => {
    set({ parsedBookmarks: bookmarks });
  },
  deleteFolder: (folderName) => {
    set((state) => {
      const { [folderName]: _, ...rest } = state.bookmarks;
      return { bookmarks: rest };
    });
  },
  deleteBookmark: (folderName, index) => {
    set((state) => ({
      bookmarks: {
        ...state.bookmarks,
        [folderName]: {
          saved: state.bookmarks[folderName].saved.filter(
            (_, i) => i !== index
          ),
          properties: { ...state.bookmarks[folderName].properties },
        },
      },
    }));
  },
  moveBookmark: (fromFolder, toFolder, index) => {
    set((state) => {
      const bookmark = state.bookmarks[fromFolder].saved[index];
      return {
        bookmarks: {
          ...state.bookmarks,
          [fromFolder]: {
            saved: state.bookmarks[fromFolder].saved.filter(
              (_, i) => i !== index
            ),
            properties: { ...state.bookmarks[fromFolder].properties },
          },
          [toFolder]: {
            saved: [bookmark, ...state.bookmarks[toFolder].saved],
            properties: {
              ...state.bookmarks[toFolder].properties,
            },
          },
        },
      };
    });
  },
  editBookmark: (folderName, index, newTitle) => {
    set((state) => {
      const bookmark = state.bookmarks[folderName].saved[index];
      bookmark.title = newTitle;
      return {
        bookmarks: {
          ...state.bookmarks,
          [folderName]: {
            saved: state.bookmarks[folderName].saved.map((b, i) =>
              i === index ? bookmark : b
            ),
            properties: { ...state.bookmarks[folderName].properties },
          },
        },
      };
    });
  },
  updateBookmarks: (url, data, folderName) => {
    set((state) => {
      const updatedBookmarks = state.bookmarks[folderName].saved.map(
        (bookmark) =>
          bookmark.link === url ? { ...bookmark, ...data } : bookmark
      );
      return {
        bookmarks: {
          ...state.bookmarks,
          [folderName]: {
            saved: updatedBookmarks,
            properties: { ...state.bookmarks[folderName].properties },
          },
        },
      };
    });
  },
});
