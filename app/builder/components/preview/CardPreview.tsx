"use client";

import { useBuilderStore } from "@/builder/state/builder-store";

export function CardPreview() {
    const { bgColor, textColor, radius, padding } = useBuilderStore();

    return (
        <div
            className="border max-w-md transition-all w-full"
            style={{
                backgroundColor: bgColor,
                borderRadius: radius,
                color: textColor,
                padding: padding,
            }}
        >
            <h4 className="font-semibold mb-2 text-lg">Card Title</h4>

            <p className="leading-relaxed opacity-90 text-sm">
                This is a preview card. Styles applied here will be exported exactly the same into WordPress.
            </p>
        </div>
    );
}
