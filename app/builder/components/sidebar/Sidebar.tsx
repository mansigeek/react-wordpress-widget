"use client";

import { useBuilderStore } from "@/builder/state/builder-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
    const {
        backgroundColor,
        textColor,
        shadow,
        showBorder,
        borderWidth,
        borderColor,
        fontFamily,
        titleFontSize,
        titleFontWeight,
        bodyFontSize,
        borderRadius,
        padding,
        setBackgroundColor,
        setTextColor,
        setShadow,
        setShowBorder,
        setBorderWidth,
        setBorderColor,
        setFontFamily,
        setTitleFontSize,
        setTitleFontWeight,
        setBodyFontSize,
        setBorderRadius,
        setPadding,
    } = useBuilderStore();

    return (
        <aside className="bg-background border max-h-screen overflow-y-auto p-4 space-y-6 w-[320px]">
            <h2 className="font-semibold text-lg">Card Styles</h2>
            <Separator />

            {/* Background Color */}
            <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                    onChange={e => {
                        return setBackgroundColor(e.target.value);
                    }}
                    type="color"
                    value={backgroundColor}
                />
            </div>

            {/* Text Color */}
            <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                    onChange={e => {
                        return setTextColor(e.target.value);
                    }}
                    type="color"
                    value={textColor}
                />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
                <Label>Border Radius</Label>
                <div className="flex gap-2">
                    <Input
                        min={0}
                        onChange={e => {
                            return setBorderRadius({
                                ...borderRadius,
                                value: Number(e.target.value),
                            });
                        }}
                        type="number"
                        value={borderRadius.value}
                    />
                    <Select
                        onValueChange={unit => {
                            return setBorderRadius({
                                ...borderRadius,
                                unit: unit as "px" | "rem",
                            });
                        }}
                        value={borderRadius.unit}
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="px">px</SelectItem>
                            <SelectItem value="rem">rem</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Padding */}
            <div className="space-y-2">
                <Label>Padding</Label>
                <div className="flex gap-2">
                    <Input
                        min={0}
                        onChange={e => {
                            return setPadding({
                                ...padding,
                                value: Number(e.target.value),
                            });
                        }}
                        type="number"
                        value={padding.value}
                    />
                    <Select
                        onValueChange={unit => {
                            return setPadding({
                                ...padding,
                                unit: unit as "px" | "rem",
                            });
                        }}
                        value={padding.unit}
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="px">px</SelectItem>
                            <SelectItem value="rem">rem</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Shadow */}
            <div className="space-y-2">
                <Label>Shadow</Label>
                <Select onValueChange={setShadow} value={shadow}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Border Toggle */}
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

            {showBorder && (
                <>
                    {/* Border Width */}
                    <div className="space-y-2">
                        <Label>Border Width (px)</Label>
                        <Input
                            min={0}
                            onChange={e => {
                                return setBorderWidth(Number(e.target.value));
                            }}
                            type="number"
                            value={borderWidth}
                        />
                    </div>

                    {/* Border Color */}
                    <div className="space-y-2">
                        <Label>Border Color</Label>
                        <Input
                            onChange={e => {
                                return setBorderColor(e.target.value);
                            }}
                            type="color"
                            value={borderColor}
                        />
                    </div>
                </>
            )}

            {/* Font Family */}
            <div className="space-y-2">
                <Label>Font Family</Label>
                <Select onValueChange={setFontFamily} value={fontFamily}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="sans-serif">Sans Serif</SelectItem>
                        <SelectItem value="monospace">Monospace</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Title Font Size */}
            <div className="space-y-2">
                <Label>Title Font Size (px)</Label>
                <Input
                    min={8}
                    onChange={e => {
                        return setTitleFontSize(Number(e.target.value));
                    }}
                    type="number"
                    value={titleFontSize}
                />
            </div>

            {/* Title Font Weight */}
            <div className="space-y-2">
                <Label>Title Font Weight</Label>
                <RadioGroup
                    onValueChange={value => {
                        return setTitleFontWeight(Number(value));
                    }}
                    value={String(titleFontWeight)}
                >
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="fw-400" value="400" />
                        <Label htmlFor="fw-400">Normal</Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="fw-500" value="500" />
                        <Label htmlFor="fw-500">Medium</Label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <RadioGroupItem id="fw-700" value="700" />
                        <Label htmlFor="fw-700">Bold</Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Body Font Size */}
            <div className="space-y-2">
                <Label>Body Font Size (px)</Label>
                <Input
                    min={8}
                    onChange={e => {
                        return setBodyFontSize(Number(e.target.value));
                    }}
                    type="number"
                    value={bodyFontSize}
                />
            </div>
        </aside>
    );
}
