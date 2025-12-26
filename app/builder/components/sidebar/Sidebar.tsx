"use client";

import { Box, CornerUpLeft, FileText, Layers, Layout, Palette, Sparkles, Type } from "lucide-react";

import { useBuilderStore } from "@/builder/state/builder-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
        title,
        subtitle,
        description,
        author,
        date,
        tags,
        imageUrl,
        showImage,
        buttonText,
        buttonLink,
        showButton,
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
        setTitle,
        setSubtitle,
        setDescription,
        setAuthor,
        setDate,
        setTags,
        setImageUrl,
        setShowImage,
        setButtonText,
        setButtonLink,
        setShowButton,
    } = useBuilderStore();

    return (
        <aside
            className={`
              backdrop-blur-sm bg-gradient-to-b border-border/50 border-r from-background max-h-screen overflow-y-auto
              shadow-lg to-muted/20 via-background w-[360px]
            `}
        >
            {/* Header */}
            <div className="backdrop-blur-md bg-background/95 border-b border-border/50 px-6 py-5 sticky top-0 z-10">
                <div className="flex gap-3 items-center">
                    <div
                        className={`
                          bg-gradient-to-br border border-primary/20 from-primary/10 p-2 rounded-lg to-primary/5
                        `}
                    >
                        <Sparkles className="size-5 text-primary" />
                    </div>
                    <div>
                        <h2
                            className={`
                              bg-clip-text bg-gradient-to-r font-bold from-foreground text-transparent text-xl
                              to-foreground/70
                            `}
                        >
                            Card Styles
                        </h2>
                        <p className="mt-0.5 text-muted-foreground text-xs">Customize your widget</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Colors Section */}
                <div className="space-y-4">
                    <div className="flex gap-2 items-center mb-4">
                        <Palette className="size-4 text-primary" />
                        <h3 className="font-semibold text-muted-foreground text-sm tracking-wide uppercase">Colors</h3>
                    </div>
                    <div className="bg-card/50 border border-border/50 p-4 rounded-xl shadow-sm space-y-4">
                        {/* Background Color */}
                        <div className="space-y-2.5">
                            <Label className="flex font-medium gap-2 items-center text-sm">
                                <div
                                    className="border-2 border-border rounded-full size-3"
                                    style={{ backgroundColor }}
                                />
                                Background Color
                            </Label>
                            <div className="relative">
                                <Input
                                    className="border-2 cursor-pointer h-12 hover:border-primary/50 transition-colors"
                                    onChange={e => {
                                        return setBackgroundColor(e.target.value);
                                    }}
                                    type="color"
                                    value={backgroundColor}
                                />
                            </div>
                        </div>

                        {/* Text Color */}
                        <div className="space-y-2.5">
                            <Label className="flex font-medium gap-2 items-center text-sm">
                                <div
                                    className="border-2 border-border rounded-full size-3"
                                    style={{ backgroundColor: textColor }}
                                />
                                Text Color
                            </Label>
                            <div className="relative">
                                <Input
                                    className="border-2 cursor-pointer h-12 hover:border-primary/50 transition-colors"
                                    onChange={e => {
                                        return setTextColor(e.target.value);
                                    }}
                                    type="color"
                                    value={textColor}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layout Section */}
                <div className="space-y-4">
                    <div className="flex gap-2 items-center mb-4">
                        <Layout className="size-4 text-primary" />
                        <h3 className="font-semibold text-muted-foreground text-sm tracking-wide uppercase">Layout</h3>
                    </div>
                    <div className="bg-card/50 border border-border/50 p-4 rounded-xl shadow-sm space-y-4">
                        {/* Border Radius */}
                        <div className="space-y-2.5">
                            <Label className="flex font-medium gap-2 items-center text-sm">
                                <CornerUpLeft className="size-3.5 text-muted-foreground" />
                                Border Radius
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    className="border-2 hover:border-primary/50 transition-colors"
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
                                    <SelectTrigger
                                        className={`border-2 hover:border-primary/50 transition-colors w-[90px]`}
                                    >
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
                        <div className="space-y-2.5">
                            <Label className="flex font-medium gap-2 items-center text-sm">
                                <Layout className="size-3.5 text-muted-foreground" />
                                Padding
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    className="border-2 hover:border-primary/50 transition-colors"
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
                                    <SelectTrigger
                                        className={`border-2 hover:border-primary/50 transition-colors w-[90px]`}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="px">px</SelectItem>
                                        <SelectItem value="rem">rem</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Effects Section */}
                <div className="space-y-4">
                    <div className="flex gap-2 items-center mb-4">
                        <Layers className="size-4 text-primary" />
                        <h3 className="font-semibold text-muted-foreground text-sm tracking-wide uppercase">Effects</h3>
                    </div>
                    <div className="bg-card/50 border border-border/50 p-4 rounded-xl shadow-sm space-y-4">
                        {/* Shadow */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Shadow</Label>
                            <Select onValueChange={setShadow} value={shadow}>
                                <SelectTrigger className="border-2 hover:border-primary/50 transition-colors w-full">
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
                        <div
                            className={`
                              bg-muted/30 border border-border/50 flex gap-3
                              hover:bg-muted/50
                              items-center p-3 rounded-lg transition-colors
                            `}
                        >
                            <Checkbox
                                checked={showBorder}
                                id="show-border"
                                onCheckedChange={checked => {
                                    return setShowBorder(checked === true);
                                }}
                            />
                            <Label
                                className="cursor-pointer flex font-medium gap-2 items-center text-sm"
                                htmlFor="show-border"
                            >
                                <Box className="size-3.5 text-muted-foreground" />
                                Show Border
                            </Label>
                        </div>

                        {showBorder && (
                            <div className="border-border/50 border-t pt-2 space-y-4">
                                {/* Border Width */}
                                <div className="space-y-2.5">
                                    <Label className="font-medium text-sm">Border Width (px)</Label>
                                    <Input
                                        className="border-2 hover:border-primary/50 transition-colors"
                                        min={0}
                                        onChange={e => {
                                            return setBorderWidth(Number(e.target.value));
                                        }}
                                        type="number"
                                        value={borderWidth}
                                    />
                                </div>

                                {/* Border Color */}
                                <div className="space-y-2.5">
                                    <Label className="flex font-medium gap-2 items-center text-sm">
                                        <div
                                            className="border-2 border-border rounded-full size-3"
                                            style={{ backgroundColor: borderColor }}
                                        />
                                        Border Color
                                    </Label>
                                    <Input
                                        className={`
                                          border-2 cursor-pointer h-12
                                          hover:border-primary/50
                                          transition-colors
                                        `}
                                        onChange={e => {
                                            return setBorderColor(e.target.value);
                                        }}
                                        type="color"
                                        value={borderColor}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                    <div className="flex gap-2 items-center mb-4">
                        <FileText className="size-4 text-primary" />
                        <h3 className="font-semibold text-muted-foreground text-sm tracking-wide uppercase">Content</h3>
                    </div>
                    <div className="bg-card/50 border border-border/50 p-4 rounded-xl shadow-sm space-y-4">
                        {/* Title */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Title</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                onChange={e => {
                                    return setTitle(e.target.value);
                                }}
                                placeholder="Card Title"
                                value={title}
                            />
                        </div>

                        {/* Subtitle */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Subtitle</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                onChange={e => {
                                    return setSubtitle(e.target.value);
                                }}
                                placeholder="Card Subtitle"
                                value={subtitle}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Description</Label>
                            <Textarea
                                className="border-2 hover:border-primary/50 min-h-[100px] resize-none transition-colors"
                                onChange={e => {
                                    return setDescription(e.target.value);
                                }}
                                placeholder="Card description text..."
                                value={description}
                            />
                        </div>

                        {/* Author */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Author</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                onChange={e => {
                                    return setAuthor(e.target.value);
                                }}
                                placeholder="Author Name"
                                value={author}
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Date</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                onChange={e => {
                                    return setDate(e.target.value);
                                }}
                                placeholder="Date"
                                value={date}
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Tags (comma separated)</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                onChange={e => {
                                    return setTags(e.target.value);
                                }}
                                placeholder="Tag1, Tag2, Tag3"
                                value={tags}
                            />
                        </div>

                        {/* Image Toggle */}
                        <div
                            className={`
                              bg-muted/30 border border-border/50 flex gap-3
                              hover:bg-muted/50
                              items-center p-3 rounded-lg transition-colors
                            `}
                        >
                            <Checkbox
                                checked={showImage}
                                id="show-image"
                                onCheckedChange={checked => {
                                    return setShowImage(checked === true);
                                }}
                            />
                            <Label className="cursor-pointer font-medium text-sm" htmlFor="show-image">
                                Show Image
                            </Label>
                        </div>

                        {showImage && (
                            <div className="space-y-2.5">
                                <Label className="font-medium text-sm">Image URL</Label>
                                <Input
                                    className="border-2 hover:border-primary/50 transition-colors"
                                    onChange={e => {
                                        return setImageUrl(e.target.value);
                                    }}
                                    placeholder="https://example.com/image.jpg"
                                    value={imageUrl}
                                />
                            </div>
                        )}

                        {/* Button Toggle */}
                        <div
                            className={`
                              bg-muted/30 border border-border/50 flex gap-3
                              hover:bg-muted/50
                              items-center p-3 rounded-lg transition-colors
                            `}
                        >
                            <Checkbox
                                checked={showButton}
                                id="show-button"
                                onCheckedChange={checked => {
                                    return setShowButton(checked === true);
                                }}
                            />
                            <Label className="cursor-pointer font-medium text-sm" htmlFor="show-button">
                                Show Button
                            </Label>
                        </div>

                        {showButton && (
                            <div className="border-border/50 border-t pt-2 space-y-4">
                                <div className="space-y-2.5">
                                    <Label className="font-medium text-sm">Button Text</Label>
                                    <Input
                                        className="border-2 hover:border-primary/50 transition-colors"
                                        onChange={e => {
                                            return setButtonText(e.target.value);
                                        }}
                                        placeholder="Button Text"
                                        value={buttonText}
                                    />
                                </div>

                                <div className="space-y-2.5">
                                    <Label className="font-medium text-sm">Button Link</Label>
                                    <Input
                                        className="border-2 hover:border-primary/50 transition-colors"
                                        onChange={e => {
                                            return setButtonLink(e.target.value);
                                        }}
                                        placeholder="https://example.com"
                                        value={buttonLink}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Typography Section */}
                <div className="space-y-4">
                    <div className="flex gap-2 items-center mb-4">
                        <Type className="size-4 text-primary" />
                        <h3 className="font-semibold text-muted-foreground text-sm tracking-wide uppercase">
                            Typography
                        </h3>
                    </div>
                    <div className="bg-card/50 border border-border/50 p-4 rounded-xl shadow-sm space-y-4">
                        {/* Font Family */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Font Family</Label>
                            <Select onValueChange={setFontFamily} value={fontFamily}>
                                <SelectTrigger className="border-2 hover:border-primary/50 transition-colors w-full">
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
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Title Font Size (px)</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                min={8}
                                onChange={e => {
                                    return setTitleFontSize(Number(e.target.value));
                                }}
                                type="number"
                                value={titleFontSize}
                            />
                        </div>

                        {/* Title Font Weight */}
                        <div className="space-y-3">
                            <Label className="font-medium text-sm">Title Font Weight</Label>
                            <RadioGroup
                                className="space-y-2"
                                onValueChange={value => {
                                    return setTitleFontWeight(Number(value));
                                }}
                                value={String(titleFontWeight)}
                            >
                                <div
                                    className={`
                                      flex gap-3
                                      hover:bg-muted/50
                                      items-center p-2 rounded-lg transition-colors
                                    `}
                                >
                                    <RadioGroupItem id="fw-400" value="400" />
                                    <Label className="cursor-pointer font-normal" htmlFor="fw-400">
                                        Normal
                                    </Label>
                                </div>
                                <div
                                    className={`
                                      flex gap-3
                                      hover:bg-muted/50
                                      items-center p-2 rounded-lg transition-colors
                                    `}
                                >
                                    <RadioGroupItem id="fw-500" value="500" />
                                    <Label className="cursor-pointer font-normal" htmlFor="fw-500">
                                        Medium
                                    </Label>
                                </div>
                                <div
                                    className={`
                                      flex gap-3
                                      hover:bg-muted/50
                                      items-center p-2 rounded-lg transition-colors
                                    `}
                                >
                                    <RadioGroupItem id="fw-700" value="700" />
                                    <Label className="cursor-pointer font-normal" htmlFor="fw-700">
                                        Bold
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Body Font Size */}
                        <div className="space-y-2.5">
                            <Label className="font-medium text-sm">Body Font Size (px)</Label>
                            <Input
                                className="border-2 hover:border-primary/50 transition-colors"
                                min={8}
                                onChange={e => {
                                    return setBodyFontSize(Number(e.target.value));
                                }}
                                type="number"
                                value={bodyFontSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
