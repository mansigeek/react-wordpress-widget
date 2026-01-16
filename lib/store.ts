// src/lib/store.ts
'use client';  // ← important: this file will be used in client components

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ── 1. Define main config interfaces ────────────────────────────────────────

export interface ThemeConfig {
  primaryColor: string;       // e.g. "#3b82f6"
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;         // e.g. "Inter", "Roboto", etc.
  borderRadius: number;       // 0–24 (Tailwind scale)
  spacingScale: number;       // multiplier for padding/margin
}

export interface ElementVisibility {
  showHeader: boolean;
  showFilters: boolean;
  showPagination: boolean;
  showPrice: boolean;
  showYear: boolean;
  showMileage: boolean;
  showContactButton: boolean;
  showImages: boolean;
  // add more toggles as needed (e.g. showFuelType, showTransmission...)
}

export interface FilterConfig {
  field: 'brand' | 'price' | 'year' | 'mileage' | string;
  label: string;
  type: 'select' | 'range' | 'checkbox';
  options?: string[];         // for select
  min?: number;
  max?: number;
  step?: number;
}

export interface SortOption {
  label: string;
  value: string;              // e.g. "price-asc", "year-desc"
}

export interface PaginationConfig {
  enabled: boolean;
  itemsPerPage: number;       // 12, 24, 48...
  type: 'numbers' | 'load-more' | 'infinite';
}

export interface BuilderConfig {
  styling: {
    theme: ThemeConfig;
    elements: ElementVisibility;
  };
  functionality: {
    filters: FilterConfig[];
    sorting: SortOption[];
    pagination: PaginationConfig;
  };
}

// ── 2. Store shape ───────────────────────────────────────────────────────────

interface BuilderStore {
  config: BuilderConfig;
  updateStyling: (updates: Partial<BuilderConfig['styling']>) => void;
  updateFunctionality: (updates: Partial<BuilderConfig['functionality']>) => void;
  updateTheme: (themeUpdates: Partial<ThemeConfig>) => void;
  toggleElement: (key: keyof ElementVisibility, value: boolean) => void;
  addFilter: (filter: FilterConfig) => void;
  removeFilter: (index: number) => void;
  // more actions as needed...
  resetConfig: () => void;
}

// ── 3. Default / initial values ─────────────────────────────────────────────

const defaultTheme: ThemeConfig = {
  primaryColor: '#3b82f6',
  secondaryColor: '#10b981',
  backgroundColor: '#ffffff',
  textColor: '#111827',
  fontFamily: 'Inter',
  borderRadius: 8,
  spacingScale: 1,
};

const defaultVisibility: ElementVisibility = {
  showHeader: true,
  showFilters: true,
  showPagination: true,
  showPrice: true,
  showYear: true,
  showMileage: true,
  showContactButton: true,
  showImages: true,
};

const defaultConfig: BuilderConfig = {
  styling: {
    theme: defaultTheme,
    elements: defaultVisibility,
  },
  functionality: {
    filters: [
      { field: 'brand', label: 'Brand', type: 'select' },
      { field: 'price', label: 'Price', type: 'range', min: 0, max: 100000, step: 1000 },
      { field: 'year', label: 'Year', type: 'range', min: 2000, max: 2026, step: 1 },
    ],
    sorting: [
      { label: 'Price: Low to High', value: 'price-asc' },
      { label: 'Price: High to Low', value: 'price-desc' },
      { label: 'Newest First', value: 'year-desc' },
    ],
    pagination: {
      enabled: true,
      itemsPerPage: 12,
      type: 'numbers',
    },
  },
};

// ── 4. Create the store ─────────────────────────────────────────────────────

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      config: defaultConfig,

      updateStyling: (updates) =>
        set((state) => ({
          config: {
            ...state.config,
            styling: { ...state.config.styling, ...updates },
          },
        })),

      updateFunctionality: (updates) =>
        set((state) => ({
          config: {
            ...state.config,
            functionality: { ...state.config.functionality, ...updates },
          },
        })),

      updateTheme: (themeUpdates) =>
        set((state) => ({
          config: {
            ...state.config,
            styling: {
              ...state.config.styling,
              theme: { ...state.config.styling.theme, ...themeUpdates },
            },
          },
        })),

      toggleElement: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            styling: {
              ...state.config.styling,
              elements: { ...state.config.styling.elements, [key]: value },
            },
          },
        })),

      addFilter: (filter) =>
        set((state) => ({
          config: {
            ...state.config,
            functionality: {
              ...state.config.functionality,
              filters: [...state.config.functionality.filters, filter],
            },
          },
        })),

      removeFilter: (index) =>
        set((state) => ({
          config: {
            ...state.config,
            functionality: {
              ...state.config.functionality,
              filters: state.config.functionality.filters.filter((_, i) => i !== index),
            },
          },
        })),

      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: 'car-builder-config',           // key in localStorage
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ config: state.config }), // optional: only persist config
      // skipHydration: true,               // uncomment if you get hydration mismatches (rare here)
    }
  )
);