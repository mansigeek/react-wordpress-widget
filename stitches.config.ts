// stitches.config.ts
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  getCssText,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: '#3b82f6',
      background: '#ffffff',
      text: '#111827',
      muted: '#6b7280',
      border: '#e5e7eb',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.5rem',
      '2xl': '1.875rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    radii: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  },
  utils: {
    p: (value: string | number) => ({
      padding: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    pt: (value: string | number) => ({
      paddingTop: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    pr: (value: string | number) => ({
      paddingRight: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    pb: (value: string | number) => ({
      paddingBottom: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    pl: (value: string | number) => ({
      paddingLeft: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    m: (value: string | number) => ({
      margin: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    mt: (value: string | number) => ({
      marginTop: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    mr: (value: string | number) => ({
      marginRight: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    mb: (value: string | number) => ({
      marginBottom: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    ml: (value: string | number) => ({
      marginLeft: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
    gap: (value: string | number) => ({
      gap: typeof value === 'number' ? `${value * 0.25}rem` : value,
    }),
  },
});

export type CSS = typeof css;
export type VariantProps<T> = T extends { variants?: infer V } ? V : never;
