"use client";

import { useBuilderStore } from "@/builder/state/builder-store";
import { registerStyle } from "@/builder/utils/style-registry";

export function CardPreview() {
    const {
        backgroundColor,
        textColor,
        padding,
        borderRadius,
        shadow,
        showBorder,
        borderWidth,
        borderColor,
        titleFontSize,
        titleFontWeight,
        bodyFontSize,
    } = useBuilderStore();

    const cardClass = registerStyle({
        backgroundColor,
        border: showBorder ? `${borderWidth}px solid ${borderColor}` : "none",
        borderRadius: `${borderRadius.value}${borderRadius.unit}`,
        boxShadow:
            shadow === "none" ? "none"
            : shadow === "sm" ? "0 1px 2px rgba(0,0,0,0.05)"
            : shadow === "md" ? "0 4px 6px rgba(0,0,0,0.1)"
            : "0 10px 15px rgba(0,0,0,0.15)",
        color: textColor,
        maxWidth: "28rem",
        padding: `${padding.value}${padding.unit}`,
        transition: "all 150ms ease",
    });

    const titleClass = registerStyle({
        fontSize: `${titleFontSize}px`,
        fontWeight: titleFontWeight,
        marginBottom: "0.5rem",
    });

    const bodyClass = registerStyle({
        fontSize: `${bodyFontSize}px`,
        lineHeight: "1.6",
        opacity: 0.9,
    });

    return (
        <div className={cardClass}>
            <h4 className={titleClass}>Card Title</h4>

            <p className={bodyClass}>
                This is a preview card. Styles applied here will be exported exactly the same into WordPress. All styles
                are dynamically generated CSS classes and are completely WordPress-safe.
            </p>
        </div>
    );
}
