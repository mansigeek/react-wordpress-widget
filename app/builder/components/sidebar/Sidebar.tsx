"use client";

import { useBuilderStore } from "@/builder/state/builder-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
    const {
        backgroundColor,
        textColor,
        borderRadius,
        padding,
        shadow,
        borderWidth,
        borderColor,
        titleFontSize,
        titleFontWeight,
        bodyFontSize,
        showBorder,
        setBackgroundColor,
        setTextColor,
        setBorderRadius,
        setPadding,
        setShadow,
        setBorderWidth,
        setBorderColor,
        setTitleFontSize,
        setTitleFontWeight,
        setBodyFontSize,
        setShowBorder,
    } = useBuilderStore();

    return (
        <aside className="bg-background border max-h-screen overflow-y-auto p-4 space-y-6 w-[320px]">
            <h2 className="font-semibold text-lg">Card Styles</h2>

            <Separator />

            {/* Background Color */}
            <div className="space-y-2">
                <Label>Background Color</Label>
                <Select
                    onValueChange={value => {
                        return setBackgroundColor(value as typeof backgroundColor);
                    }}
                    value={backgroundColor}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="gray-50">Gray 50</SelectItem>
                        <SelectItem value="gray-100">Gray 100</SelectItem>
                        <SelectItem value="blue-50">Blue 50</SelectItem>
                        <SelectItem value="green-50">Green 50</SelectItem>
                        <SelectItem value="red-50">Red 50</SelectItem>
                        <SelectItem value="yellow-50">Yellow 50</SelectItem>
                        <SelectItem value="purple-50">Purple 50</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Text Color */}
            <div className="space-y-2">
                <Label>Text Color</Label>
                <Select
                    onValueChange={value => {
                        return setTextColor(value as typeof textColor);
                    }}
                    value={textColor}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gray-900">Gray 900</SelectItem>
                        <SelectItem value="gray-800">Gray 800</SelectItem>
                        <SelectItem value="gray-700">Gray 700</SelectItem>
                        <SelectItem value="blue-900">Blue 900</SelectItem>
                        <SelectItem value="green-900">Green 900</SelectItem>
                        <SelectItem value="red-900">Red 900</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
                <Label>Border Radius</Label>
                <RadioGroup
                    onValueChange={value => {
                        return setBorderRadius(value as typeof borderRadius);
                    }}
                    value={borderRadius}
                >
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-none" value="none" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-none">
                            None
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-sm" value="sm" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-sm">
                            Small
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-md" value="md" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-md">
                            Medium
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-lg" value="lg" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-lg">
                            Large
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-xl" value="xl" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-xl">
                            Extra Large
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-2xl" value="2xl" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-2xl">
                            2XL
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-3xl" value="3xl" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-3xl">
                            3XL
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="radius-full" value="full" />
                        <Label className="cursor-pointer font-normal" htmlFor="radius-full">
                            Full
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Padding */}
            <div className="space-y-2">
                <Label>Padding</Label>
                <Select
                    onValueChange={value => {
                        return setPadding(value as typeof padding);
                    }}
                    value={padding}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small (0.5rem)</SelectItem>
                        <SelectItem value="md">Medium (1rem)</SelectItem>
                        <SelectItem value="lg">Large (1.5rem)</SelectItem>
                        <SelectItem value="xl">Extra Large (2rem)</SelectItem>
                        <SelectItem value="2xl">2XL (2.5rem)</SelectItem>
                        <SelectItem value="3xl">3XL (3rem)</SelectItem>
                        <SelectItem value="4xl">4XL (4rem)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Shadow */}
            <div className="space-y-2">
                <Label>Shadow</Label>
                <Select
                    onValueChange={value => {
                        return setShadow(value as typeof shadow);
                    }}
                    value={shadow}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="2xl">2XL</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Border */}
            <div className="space-y-2">
                <div className="flex gap-2 items-center">
                    <Checkbox
                        checked={showBorder}
                        id="show-border"
                        onCheckedChange={checked => {
                            return setShowBorder(checked === true);
                        }}
                    />
                    <Label className="cursor-pointer font-normal" htmlFor="show-border">
                        Show Border
                    </Label>
                </div>
            </div>

            {showBorder && (
                <>
                    {/* Border Width */}
                    <div className="space-y-2">
                        <Label>Border Width</Label>
                        <RadioGroup
                            onValueChange={value => {
                                return setBorderWidth(value as typeof borderWidth);
                            }}
                            value={borderWidth}
                        >
                            <div className="flex gap-2 items-center">
                                <RadioGroupItem id="border-thin" value="thin" />
                                <Label className="cursor-pointer font-normal" htmlFor="border-thin">
                                    Thin
                                </Label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <RadioGroupItem id="border-medium" value="medium" />
                                <Label className="cursor-pointer font-normal" htmlFor="border-medium">
                                    Medium
                                </Label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <RadioGroupItem id="border-thick" value="thick" />
                                <Label className="cursor-pointer font-normal" htmlFor="border-thick">
                                    Thick
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Border Color */}
                    <div className="space-y-2">
                        <Label>Border Color</Label>
                        <Select
                            onValueChange={value => {
                                return setBorderColor(value as typeof borderColor);
                            }}
                            value={borderColor}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gray-200">Gray 200</SelectItem>
                                <SelectItem value="gray-300">Gray 300</SelectItem>
                                <SelectItem value="blue-200">Blue 200</SelectItem>
                                <SelectItem value="green-200">Green 200</SelectItem>
                                <SelectItem value="red-200">Red 200</SelectItem>
                                <SelectItem value="purple-200">Purple 200</SelectItem>
                                <SelectItem value="transparent">Transparent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )}

            {/* Title Font Size */}
            <div className="space-y-2">
                <Label>Title Font Size</Label>
                <Select
                    onValueChange={value => {
                        return setTitleFontSize(value as typeof titleFontSize);
                    }}
                    value={titleFontSize}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="xs">Extra Small</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="2xl">2XL</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Title Font Weight */}
            <div className="space-y-2">
                <Label>Title Font Weight</Label>
                <RadioGroup
                    onValueChange={value => {
                        return setTitleFontWeight(value as typeof titleFontWeight);
                    }}
                    value={titleFontWeight}
                >
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="weight-normal" value="normal" />
                        <Label className="cursor-pointer font-normal" htmlFor="weight-normal">
                            Normal
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="weight-medium" value="medium" />
                        <Label className="cursor-pointer font-normal" htmlFor="weight-medium">
                            Medium
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="weight-semibold" value="semibold" />
                        <Label className="cursor-pointer font-normal" htmlFor="weight-semibold">
                            Semibold
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="weight-bold" value="bold" />
                        <Label className="cursor-pointer font-normal" htmlFor="weight-bold">
                            Bold
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Body Font Size */}
            <div className="space-y-2">
                <Label>Body Font Size</Label>
                <Select
                    onValueChange={value => {
                        return setBodyFontSize(value as typeof bodyFontSize);
                    }}
                    value={bodyFontSize}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="xs">Extra Small</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="2xl">2XL</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </aside>
    );
}
