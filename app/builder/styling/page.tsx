// app/builder/styling/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { styled } from '@/stitches.config';
import { useBuilderStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// ── Schema subset for this page ─────────────────────────────────────────────
const stylingFormSchema = z.object({
  theme: z.object({
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex'),
    backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex'),
    textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex'),
    fontFamily: z.string().min(1, 'Required'),
    borderRadius: z.number().int().min(0).max(24),
    spacingScale: z.number().min(0.5).max(3).step(0.1),
  }),
  elements: z.object({
    showPrice: z.boolean(),
    showContactButton: z.boolean(),
  }),
  functionality: z.object({
    enableBrandFilter: z.boolean(),
    enablePriceRangeFilter: z.boolean(),
    enablePrimarySort: z.boolean(),
    enableSecondarySort: z.boolean(),
  }),
});

type StylingFormValues = z.infer<typeof stylingFormSchema>;

// ── Car data types ──────────────────────────────────────────────────────────
interface CarData {
  id: number;
  brand: string;
  model: string;
  title: string;
  image: string;
  price: number;
  year: number;
  mileage: number;
}

// ── Mock car data with realistic brands ────────────────────────────────────
const mockCars: Omit<CarData, 'id'>[] = [
  { brand: 'Toyota', model: 'Camry', title: 'Toyota Camry', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', price: 28500, year: 2023, mileage: 15000 },
  { brand: 'Honda', model: 'Accord', title: 'Honda Accord', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', price: 32000, year: 2024, mileage: 5000 },
  { brand: 'Ford', model: 'F-150', title: 'Ford F-150', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', price: 45000, year: 2023, mileage: 12000 },
  { brand: 'BMW', model: '3 Series', title: 'BMW 3 Series', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', price: 42000, year: 2024, mileage: 8000 },
  { brand: 'Tesla', model: 'Model 3', title: 'Tesla Model 3', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400', price: 38000, year: 2024, mileage: 3000 },
  { brand: 'Audi', model: 'A4', title: 'Audi A4', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', price: 41000, year: 2023, mileage: 18000 },
  { brand: 'Toyota', model: 'RAV4', title: 'Toyota RAV4', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', price: 35000, year: 2024, mileage: 7000 },
  { brand: 'Honda', model: 'CR-V', title: 'Honda CR-V', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', price: 33000, year: 2023, mileage: 22000 },
  { brand: 'Ford', model: 'Mustang', title: 'Ford Mustang', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', price: 39000, year: 2024, mileage: 6000 },
  { brand: 'BMW', model: 'X5', title: 'BMW X5', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', price: 55000, year: 2023, mileage: 15000 },
  { brand: 'Tesla', model: 'Model Y', title: 'Tesla Model Y', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400', price: 48000, year: 2024, mileage: 4000 },
  { brand: 'Audi', model: 'Q5', title: 'Audi Q5', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', price: 47000, year: 2023, mileage: 20000 },
  { brand: 'Toyota', model: 'Corolla', title: 'Toyota Corolla', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', price: 24000, year: 2023, mileage: 25000 },
  { brand: 'Honda', model: 'Civic', title: 'Honda Civic', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', price: 26000, year: 2024, mileage: 9000 },
  { brand: 'Ford', model: 'Explorer', title: 'Ford Explorer', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', price: 42000, year: 2023, mileage: 19000 },
  { brand: 'BMW', model: '5 Series', title: 'BMW 5 Series', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', price: 58000, year: 2024, mileage: 5000 },
  { brand: 'Tesla', model: 'Model S', title: 'Tesla Model S', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400', price: 75000, year: 2024, mileage: 2000 },
  { brand: 'Audi', model: 'A6', title: 'Audi A6', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400', price: 52000, year: 2023, mileage: 16000 },
];

// ── Format currency ──────────────────────────────────────────────────────────
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

// ── Format mileage ─────────────────────────────────────────────────────────
function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles);
}

// ── Sort options ────────────────────────────────────────────────────────────
const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'year-desc' },
  { label: 'Oldest First', value: 'year-asc' },
] as const;

const brandOptions = ['Toyota', 'Honda', 'Ford', 'BMW', 'Tesla', 'Audi'] as const;

export default function StylingPage() {
  const { config, updateStyling, updateFunctionality } = useBuilderStore();
  const [cars, setCars] = useState<CarData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewBrand, setPreviewBrand] = useState<string>('');
  const [previewPriceRange, setPreviewPriceRange] = useState<[number, number]>([0, 100000]);
  const [previewPrimarySort, setPreviewPrimarySort] = useState<string>('price-asc');
  const [previewSecondarySort, setPreviewSecondarySort] = useState<string>('none');

  // ── Initialize form with defaults from store ──────────────────────────────
  const getDefaultFunctionality = () => {
    const brandFilter = config.functionality.filters.find((f) => f.field === 'brand');
    const priceFilter = config.functionality.filters.find((f) => f.field === 'price');
    const primarySort = config.functionality.sorting[0];
    const secondarySort = config.functionality.sorting[1];

    return {
      enableBrandFilter: brandFilter !== undefined,
      enablePriceRangeFilter: priceFilter !== undefined,
      enablePrimarySort: primarySort !== undefined,
      enableSecondarySort: secondarySort !== undefined,
    };
  };

  const form = useForm<StylingFormValues>({
    resolver: zodResolver(stylingFormSchema),
    defaultValues: {
      theme: config.styling.theme,
      elements: {
        showPrice: config.styling.elements.showPrice,
        showContactButton: config.styling.elements.showContactButton,
      },
      functionality: getDefaultFunctionality(),
    },
  });

  // ── Fetch car data ────────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchCars() {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Use mock car data with IDs
        const carData: CarData[] = mockCars.map((car, index) => ({
          ...car,
          id: index + 1,
        }));
        setCars(carData);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast.error('Failed to load preview data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCars();
  }, []);


  // ── Update Zustand store when functionality toggles change ────────────────
  const handleFunctionalityToggle = (
    key: keyof StylingFormValues['functionality'],
    enabled: boolean
  ) => {
    form.setValue(`functionality.${key}`, enabled);

    const currentValues = form.getValues('functionality');
    const filters: typeof config.functionality.filters = [];
    const sorting: typeof config.functionality.sorting = [];

    // Build filters array
    if (currentValues.enableBrandFilter) {
      filters.push({
        field: 'brand',
        label: 'Brand',
        type: 'select',
        options: brandOptions as unknown as string[],
      });
    }
    if (currentValues.enablePriceRangeFilter) {
      filters.push({
        field: 'price',
        label: 'Price',
        type: 'range',
        min: 0,
        max: 100000,
        step: 1000,
      });
    }

    // Build sorting array
    if (currentValues.enablePrimarySort) {
      sorting.push({
        label: 'Price: Low to High',
        value: 'price-asc',
      });
    }
    if (currentValues.enableSecondarySort) {
      sorting.push({
        label: 'Newest First',
        value: 'year-desc',
      });
    }

    updateFunctionality({ filters, sorting });
  };

  const onSubmit = (values: StylingFormValues) => {
    // Update styling
    updateStyling({
      theme: {
        ...config.styling.theme,
        ...values.theme,
      },
      elements: {
        ...config.styling.elements,
        ...values.elements,
      },
    });

    // Update functionality
    const filters: typeof config.functionality.filters = [];
    const sorting: typeof config.functionality.sorting = [];

    if (values.functionality.enableBrandFilter) {
      filters.push({
        field: 'brand',
        label: 'Brand',
        type: 'select',
        options: brandOptions as unknown as string[],
      });
    }
    if (values.functionality.enablePriceRangeFilter) {
      filters.push({
        field: 'price',
        label: 'Price',
        type: 'range',
        min: 0,
        max: 100000,
        step: 1000,
      });
    }
    if (values.functionality.enablePrimarySort) {
      sorting.push({
        label: 'Price: Low to High',
        value: 'price-asc',
      });
    }
    if (values.functionality.enableSecondarySort) {
      sorting.push({
        label: 'Newest First',
        value: 'year-desc',
      });
    }

    updateFunctionality({ filters, sorting });

    toast.success('Configuration updated', {
      description: 'Styling and functionality changes applied',
    });
  };

  // ── Watch form values for live preview ────────────────────────────────────
  const primaryColor = form.watch('theme.primaryColor');
  const backgroundColor = form.watch('theme.backgroundColor');
  const textColor = form.watch('theme.textColor');
  const fontFamily = form.watch('theme.fontFamily');
  const borderRadius = form.watch('theme.borderRadius');
  const spacingScale = form.watch('theme.spacingScale');
  const showPrice = form.watch('elements.showPrice');
  const showContactButton = form.watch('elements.showContactButton');
  const enableBrandFilter = form.watch('functionality.enableBrandFilter');
  const enablePriceRangeFilter = form.watch('functionality.enablePriceRangeFilter');
  const enablePrimarySort = form.watch('functionality.enablePrimarySort');
  const enableSecondarySort = form.watch('functionality.enableSecondarySort');

  // ── Apply spacing scale as multiplier ────────────────────────────────────
  const spacingMultiplier = spacingScale;

  // ── Filter and sort cars based on preview controls ────────────────────────
  const filteredAndSortedCars = React.useMemo(() => {
    let result = [...cars];

    // Apply brand filter
    if (enableBrandFilter && previewBrand) {
      result = result.filter((car) => car.brand === previewBrand);
    }

    // Apply price range filter
    if (enablePriceRangeFilter) {
      result = result.filter(
        (car) => car.price >= previewPriceRange[0] && car.price <= previewPriceRange[1]
      );
    }

    // Apply sorting
    if (enablePrimarySort && previewPrimarySort) {
      const [field, direction] = previewPrimarySort.split('-');
      result.sort((a, b) => {
        let comparison = 0;
        if (field === 'price') {
          comparison = a.price - b.price;
        } else if (field === 'year') {
          comparison = a.year - b.year;
        }
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    // Apply secondary sort if enabled
    if (enableSecondarySort && previewSecondarySort && previewSecondarySort !== 'none') {
      const [field, direction] = previewSecondarySort.split('-');
      result.sort((a, b) => {
        // Only sort if primary sort didn't already sort by this field
        const primaryField = previewPrimarySort?.split('-')[0];
        if (field === primaryField) return 0;

        let comparison = 0;
        if (field === 'price') {
          comparison = a.price - b.price;
        } else if (field === 'year') {
          comparison = a.year - b.year;
        }
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [
    cars,
    enableBrandFilter,
    previewBrand,
    enablePriceRangeFilter,
    previewPriceRange,
    enablePrimarySort,
    previewPrimarySort,
    enableSecondarySort,
    previewSecondarySort,
  ]);

  // ── Stitches styled components for preview ────────────────────────────────
  const PreviewContainer = styled('div', {
    fontFamily: '$fontFamily',
    backgroundColor: '$background',
    color: '$text',
  });

  const PreviewGrid = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '$6',
    '@sm': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@lg': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  });

  const CarCard = styled('div', {
    backgroundColor: '$background',
    borderRadius: '$lg',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
  });

  const CarImage = styled('div', {
    width: '100%',
    height: '12rem',
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  });

  const CarContent = styled('div', {
    padding: '$6',
  });

  const CarTitle = styled('h3', {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: '$3',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  });

  const CarPrice = styled('div', {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '$2',
  });

  const CarMeta = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
    flexWrap: 'wrap',
  });

  const MetaBadge = styled('span', {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '$md',
    border: '1px solid #e5e7eb',
    backgroundColor: 'transparent',
  });

  const CarButton = styled('button', {
    width: '100%',
    padding: '$3',
    borderRadius: '$lg',
    border: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 0.9,
    },
  });

  const FilterBar = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    marginBottom: '$6',
    padding: '$4',
    backgroundColor: '$background',
    borderRadius: '$lg',
    border: '1px solid #e5e7eb',
    '@sm': {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
  });

  const FilterGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    flex: 1,
  });

  const FilterLabel = styled('label', {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '$text',
  });

  const FilterSelect = styled('select', {
    padding: '$2',
    borderRadius: '$md',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    backgroundColor: '$background',
    color: '$text',
    '&:focus': {
      outline: 'none',
      borderColor: '$primary',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  });

  const PriceRangeContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  });

  const PriceRangeInputs = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '$2',
  });

  const PriceInput = styled('input', {
    padding: '$2',
    borderRadius: '$md',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    backgroundColor: '$background',
    color: '$text',
    '&:focus': {
      outline: 'none',
      borderColor: '$primary',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  });

  const SortContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    marginBottom: '$6',
    '@sm': {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
  });

  const StatusBadges = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    marginBottom: '$6',
  });

  const StatusBadge = styled('span', {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '$md',
    border: '1px solid',
    display: 'inline-block',
    marginRight: '$2',
  });

  const EmptyState = styled('div', {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '$8',
    color: '$muted',
  });

  return (
    <div className="flex overflow-hidden bg-background">
        {/* Sidebar – fixed width, scrollable */}
        <aside className="w-96 shrink-0 border-r bg-muted/40 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Styling</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Customize colors, typography and visibility
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Theme Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Theme</h2>
                </div>

                <div className="space-y-5">
                  {/* Primary Color */}
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-md border shadow-sm"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <Input
                        id="primaryColor"
                        type="color"
                        {...form.register('theme.primaryColor')}
                        className="h-10 w-16 p-1"
                      />
                      <Input
                        {...form.register('theme.primaryColor')}
                        className="font-mono flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Used for buttons, links, accents
                    </p>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select
                      value={fontFamily}
                      onValueChange={(v) => form.setValue('theme.fontFamily', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="system-ui">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Border Radius</Label>
                      <span className="text-sm text-muted-foreground">
                        {borderRadius} px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={24}
                      step={1}
                      value={[borderRadius]}
                      onValueChange={([v]) => form.setValue('theme.borderRadius', v)}
                    />
                  </div>

                  {/* Spacing Scale */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Spacing Scale</Label>
                      <span className="text-sm text-muted-foreground">
                        {spacingScale.toFixed(1)}×
                      </span>
                    </div>
                    <Slider
                      min={0.5}
                      max={3}
                      step={0.1}
                      value={[spacingScale]}
                      onValueChange={([v]) => form.setValue('theme.spacingScale', v)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Visibility Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Visibility</h2>

                <div className="space-y-4">
                  {[
                    { id: 'showPrice', label: 'Price Display' },
                    { id: 'showContactButton', label: 'Contact / CTA Button' },
                  ].map(({ id, label }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between py-1"
                    >
                      <Label htmlFor={id} className="cursor-pointer">
                        {label}
                      </Label>
                      <Switch
                        id={id}
                        checked={form.watch(`elements.${id as 'showPrice' | 'showContactButton'}`)}
                        onCheckedChange={(checked) =>
                          form.setValue(`elements.${id as 'showPrice' | 'showContactButton'}`, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Functionality Controls Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Functionality Controls</h2>

                <div className="space-y-4">
                  {[
                    { id: 'enableBrandFilter', label: 'Enable Brand Filter' },
                    { id: 'enablePriceRangeFilter', label: 'Enable Price Range Filter' },
                    { id: 'enablePrimarySort', label: 'Enable Primary Sorting' },
                    { id: 'enableSecondarySort', label: 'Enable Secondary Sorting' },
                  ].map(({ id, label }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between py-1"
                    >
                      <Label htmlFor={id} className="cursor-pointer">
                        {label}
                      </Label>
                      <Switch
                        id={id}
                        checked={form.watch(`functionality.${id as keyof StylingFormValues['functionality']}`)}
                        onCheckedChange={(checked) =>
                          handleFunctionalityToggle(
                            id as keyof StylingFormValues['functionality'],
                            checked
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Save Styling Changes
                </Button>
              </div>
            </form>
          </div>
        </aside>

        {/* Main preview area – grid of car cards */}
        <main
          className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-background to-muted/30"
          style={{
            fontFamily: fontFamily === 'system-ui' ? 'system-ui, sans-serif' : `${fontFamily}, sans-serif`,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Live Preview</h2>

            {/* Status Badges */}
            {(enableBrandFilter || enablePriceRangeFilter || enablePrimarySort || enableSecondarySort) && (
              <StatusBadges
                css={{
                  '--primary': primaryColor,
                  '--radius': `${borderRadius}px`,
                }}
              >
                {(enableBrandFilter || enablePriceRangeFilter) && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Filters: </span>
                    {enableBrandFilter && (
                      <StatusBadge
                        css={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)',
                        }}
                      >
                        Brand
                      </StatusBadge>
                    )}
                    {enablePriceRangeFilter && (
                      <StatusBadge
                        css={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)',
                        }}
                      >
                        Price Range
                      </StatusBadge>
                    )}
                  </div>
                )}
                {(enablePrimarySort || enableSecondarySort) && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Sorting: </span>
                    {enablePrimarySort && (
                      <StatusBadge
                        css={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)',
                        }}
                      >
                        Primary Enabled
                      </StatusBadge>
                    )}
                    {enableSecondarySort && (
                      <StatusBadge
                        css={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)',
                        }}
                      >
                        Secondary Enabled
                      </StatusBadge>
                    )}
                  </div>
                )}
              </StatusBadges>
            )}

            {/* Filter Bar */}
            {(enableBrandFilter || enablePriceRangeFilter) && (
              <FilterBar
                css={{
                  '--primary': primaryColor,
                  '--radius': `${borderRadius}px`,
                  '--spacing': `${spacingMultiplier}`,
                }}
              >
                {enableBrandFilter && (
                  <FilterGroup>
                    <FilterLabel>Brand</FilterLabel>
                    <FilterSelect
                      value={previewBrand}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPreviewBrand(e.target.value)}
                      css={{
                        borderColor: '#e5e7eb',
                        '&:focus': {
                          borderColor: 'var(--primary)',
                        },
                      }}
                    >
                      <option value="">All Brands</option>
                      {brandOptions.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </FilterSelect>
                  </FilterGroup>
                )}
                {enablePriceRangeFilter && (
                  <FilterGroup>
                    <FilterLabel>Price Range</FilterLabel>
                    <PriceRangeContainer>
                      <Slider
                        min={0}
                        max={100000}
                        step={1000}
                        value={[previewPriceRange[0], previewPriceRange[1]]}
                        onValueChange={(values) =>
                          setPreviewPriceRange([values[0], values[1]])
                        }
                      />
                      <PriceRangeInputs>
                        <PriceInput
                          type="number"
                          min={0}
                          max={100000}
                          step={1000}
                          value={previewPriceRange[0]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPreviewPriceRange([Number(e.target.value), previewPriceRange[1]])
                          }
                          css={{
                            borderColor: '#e5e7eb',
                            '&:focus': {
                              borderColor: 'var(--primary)',
                            },
                          }}
                        />
                        <PriceInput
                          type="number"
                          min={0}
                          max={100000}
                          step={1000}
                          value={previewPriceRange[1]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPreviewPriceRange([previewPriceRange[0], Number(e.target.value)])
                          }
                          css={{
                            borderColor: '#e5e7eb',
                            '&:focus': {
                              borderColor: 'var(--primary)',
                            },
                          }}
                        />
                      </PriceRangeInputs>
                    </PriceRangeContainer>
                  </FilterGroup>
                )}
              </FilterBar>
            )}

            {/* Sort Controls */}
            {(enablePrimarySort || enableSecondarySort) && (
              <SortContainer
                css={{
                  '--primary': primaryColor,
                  '--radius': `${borderRadius}px`,
                }}
              >
                {enablePrimarySort && (
                  <FilterGroup>
                    <FilterLabel>Primary Sort</FilterLabel>
                    <FilterSelect
                      value={previewPrimarySort}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPreviewPrimarySort(e.target.value)}
                      css={{
                        borderColor: '#e5e7eb',
                        '&:focus': {
                          borderColor: 'var(--primary)',
                        },
                      }}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FilterSelect>
                  </FilterGroup>
                )}
                {enableSecondarySort && (
                  <FilterGroup>
                    <FilterLabel>Secondary Sort</FilterLabel>
                    <FilterSelect
                      value={previewSecondarySort}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPreviewSecondarySort(e.target.value)}
                      css={{
                        borderColor: '#e5e7eb',
                        '&:focus': {
                          borderColor: 'var(--primary)',
                        },
                      }}
                    >
                      <option value="none">None</option>
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FilterSelect>
                  </FilterGroup>
                )}
              </SortContainer>
            )}

            {/* Loading skeleton */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted" />
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-6 bg-muted rounded w-1/2 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                    </CardContent>
                    <CardFooter>
                      <div className="h-9 bg-muted rounded w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              /* Car cards grid using Stitches */
              <PreviewContainer
                css={{
                  '--primary': primaryColor,
                  '--background': backgroundColor,
                  '--text': textColor,
                  '--radius': `${borderRadius}px`,
                  '--spacing': `${spacingMultiplier}`,
                  fontFamily: fontFamily === 'system-ui' ? 'system-ui, sans-serif' : `${fontFamily}, sans-serif`,
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                }}
              >
                <PreviewGrid
                  css={{
                    gap: `calc(1.5rem * var(--spacing))`,
                  }}
                >
                  {filteredAndSortedCars.length === 0 ? (
                    <EmptyState>
                      No cars match the current filters. Try adjusting your filters.
                    </EmptyState>
                  ) : (
                    filteredAndSortedCars.map((car) => (
                    <CarCard
                      key={car.id}
                      css={{
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <CarImage />
                      <CarContent
                        css={{
                          padding: `calc(1.5rem * var(--spacing))`,
                        }}
                      >
                        <CarTitle>{car.title}</CarTitle>
                        {showPrice && (
                          <CarPrice
                            css={{
                              color: 'var(--primary)',
                            }}
                          >
                            {formatCurrency(car.price)}
                          </CarPrice>
                        )}
                        <CarMeta>
                          <MetaBadge>{car.year}</MetaBadge>
                          <MetaBadge>{formatMileage(car.mileage)} mi</MetaBadge>
                        </CarMeta>
                        {showContactButton && (
                          <CarButton
                            css={{
                              marginTop: `calc(1.5rem * var(--spacing))`,
                              backgroundColor: 'var(--primary)',
                              color: '#ffffff',
                              borderRadius: 'var(--radius)',
                            }}
                          >
                            Contact Seller
                          </CarButton>
                        )}
                      </CarContent>
                    </CarCard>
                    ))
                  )}
                </PreviewGrid>
              </PreviewContainer>
            )}
          </div>
        </main>
      </div>
  );
}
