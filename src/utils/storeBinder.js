import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useDatastore } from "./store";

export const useBoundStore = create(
  persist(
    (...args) => ({
      ...useDatastore(...args),
    }),
    {
      name: "bound-store",
      partialize: (state) => ({
        bookmarks: state.bookmarks,
      }),
    },
  )
);