import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useDatastore } from "./store";
import { useComponentStore } from "./componentStore";


export const useBoundStore = create(
  persist(
    (...args) => ({
      ...useDatastore(...args),
      ...useComponentStore(...args),
    }),
    {
      name: "bound-store",
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        currentFolderDirectory: state.currentFolderDirectory,
      }),
    },
  )
);