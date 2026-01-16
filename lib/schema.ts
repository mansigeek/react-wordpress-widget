// src/lib/schema.ts
import { z } from 'zod';

// ── Reusable primitives ──────────────────────────────────────────────────────

const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Must be a valid 6-digit hex color (e.g. #3b82f6)' })
  .default('#ffffff');

const fontFamilySchema = z
  .string()
  .min(1, 'Font family required')
  .max(50)
  .default('Inter');

const positiveIntSchema = z.number().positive().int().min(1);

// ── Theme ────────────────────────────────────────────────────────────────────
export const themeSchema = z.object({
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema,
  backgroundColor: hexColorSchema,
  textColor: hexColorSchema,
  fontFamily: fontFamilySchema,
  borderRadius: z.number().int().min(0).max(24).default(8),
  spacingScale: z.number().min(0.5).max(3).step(0.1).default(1),
});

// ── Visibility (unchanged) ──────────────────────────────────────────────────
export const visibilitySchema = z.object({
  showHeader: z.boolean().default(true),
  showFilters: z.boolean().default(true),
  showPagination: z.boolean().default(true),
  showPrice: z.boolean().default(true),
  showYear: z.boolean().default(true),
  showMileage: z.boolean().default(true),
  showContactButton: z.boolean().default(true),
  showImages: z.boolean().default(true),
});

// ── Filters (unchanged) ─────────────────────────────────────────────────────
export const filterSchema = z.object({
  field: z.string().min(1, 'Field name required').max(30),
  label: z.string().min(1, 'Label required').max(50),
  type: z.enum(['select', 'range', 'checkbox']),
  options: z.array(z.string().min(1)).optional().default([]),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().positive().optional(),
}).refine(
  (data) => {
    if (data.type === 'range') {
      return data.min !== undefined && data.max !== undefined && data.min < data.max;
    }
    return true;
  },
  { message: 'Range filters need valid min < max', path: ['min'] }
);

export const sortOptionSchema = z.object({
  label: z.string().min(1).max(50),
  value: z.string().min(1).max(50),
});

// ── Pagination – FIXED ──────────────────────────────────────────────────────
export const paginationSchema = z.object({
  enabled: z.boolean().default(true),
  itemsPerPage: positiveIntSchema
    .max(100, { message: "Maximum 100 items per page" })
    .default(12),
  type: z.enum(['numbers', 'load-more', 'infinite']).default('numbers'),
});

// ── The rest remains the same ───────────────────────────────────────────────
export const stylingSchema = z.object({
  theme: themeSchema,
  elements: visibilitySchema,
});

export const functionalitySchema = z.object({
  filters: z.array(filterSchema).max(10, 'Maximum 10 filters allowed'),
  sorting: z.array(sortOptionSchema).max(8, 'Maximum 8 sort options'),
  pagination: paginationSchema,
});

export const builderConfigSchema = z.object({
  styling: stylingSchema,
  functionality: functionalitySchema,
});

export type BuilderConfigForm = z.infer<typeof builderConfigSchema>;