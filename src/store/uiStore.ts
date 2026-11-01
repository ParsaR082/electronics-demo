"use client";

import { create } from "zustand";
import { Product } from "@/types/product";

interface QuickViewState {
  isOpen: boolean;
  product: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  isOpen: false,
  product: null,
  openQuickView: (product) => set({ isOpen: true, product }),
  closeQuickView: () => set({ isOpen: false, product: null }),
}));

interface SearchModalState {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

export const useSearchModalStore = create<SearchModalState>((set) => ({
  isOpen: false,
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false }),
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
}));
