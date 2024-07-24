export const useComponentStore = (set, get) => ({
  openCreateFolder: false,
  openCreateGroup: false,
  currentFolderDirectory: 'uncategorized',
  snackbarMessage: "",
  setSnackbarMessage: (message) => {
    set({ snackbarMessage: message });
  },
  setOpenCreateGroup: () => {
    set({ openCreateGroup: !get().openCreateGroup });
  },
  setOpenCreateFolder: () => {
    set({ openCreateFolder: !get().openCreateFolder });
  },
  setCurrentFolderDirectory: (directory) => {
    set({ currentFolderDirectory: directory });
  },
});
