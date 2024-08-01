export const useComponentStore = (set, get) => ({
  openCreateFolder: false,
  openCreateGroup: false,
  openCodeBlockModal: false,
  codeSnippet: '',
  codeLanguage: '',
  currentFolderDirectory: "uncategorized",
  snackbarMessage: "",
  isListView: true,
  isGridView: false,
  isSuperuserView: false,
  
  setSnackbarMessage: (message) => {
    set({ snackbarMessage: message });
  },
  setOpenCreateGroup: () => {
    set({ openCreateGroup: !get().openCreateGroup });
  },
  setOpenCreateFolder: () => {
    set({ openCreateFolder: !get().openCreateFolder });
  },
  setOpenCodeBlockModal: () => {
    set({ openCodeBlockModal: !get().openCodeBlockModal });
  },
  setCodeSnippet: (snippet) => {
    set({ codeSnippet: snippet });
  },
  setCodeLanguage: (language) => {
    set({ codeLanguage: language });
  },
  setCurrentFolderDirectory: (directory) => {
    set({ currentFolderDirectory: directory });
  },
  setGridView: () => {
    set({ isGridView: !get().isGridView });
  },
  setListView: () => {
    set({ isGridView: !get().isListView });
  },
  setSuperuserView: () => {
    set({ isSuperuserView: !get().isSuperuserView });
  },
});
