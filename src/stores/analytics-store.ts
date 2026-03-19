import { create } from "zustand";

interface PageVisit {
  page: string;
  startTime: number;
}

interface AnalyticsStore {
  currentVisit: PageVisit | null;
  startPageVisit: (page: string) => void;
  endPageVisit: () => { page: string; duration: number } | null;
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  currentVisit: null,

  startPageVisit: (page: string) => {
    set({
      currentVisit: {
        page,
        startTime: Date.now(),
      },
    });
  },

  endPageVisit: () => {
    const { currentVisit } = get();
    if (!currentVisit) return null;

    const duration = Date.now() - currentVisit.startTime;
    set({ currentVisit: null });

    return {
      page: currentVisit.page,
      duration, // milliseconds
    };
  },
}));
