"use client";

import { useBuilderStore } from "@/builder/state/builder-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export function Sidebar() {
    const { bgColor, textColor, radius, padding, setBgColor, setTextColor, setRadius, setPadding } = useBuilderStore();

    return (
        <aside className="bg-background border p-4 space-y-6 w-[280px]">
            <h2 className="font-semibold text-lg">Card Styles</h2>

            <Separator />

            {/* Background Color */}
            <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                    className="h-10 p-1"
                    onChange={e => {
                        return setBgColor(e.target.value);
                    }}
                    type="color"
                    value={bgColor}
                />
            </div>

            {/* Text Color */}
            <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                    className="h-10 p-1"
                    onChange={e => {
                        return setTextColor(e.target.value);
                    }}
                    type="color"
                    value={textColor}
                />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
                <Label>Border Radius ({radius}px)</Label>
                <Slider
                    max={40}
                    min={0}
                    onValueChange={([value]) => {
                        return setRadius(value);
                    }}
                    step={2}
                    value={[radius]}
                />
            </div>

            {/* Padding */}
            <div className="space-y-2">
                <Label>Padding ({padding}px)</Label>
                <Slider
                    max={48}
                    min={8}
                    onValueChange={([value]) => {
                        return setPadding(value);
                    }}
                    step={4}
                    value={[padding]}
                />
            </div>
        </aside>
    );
}
