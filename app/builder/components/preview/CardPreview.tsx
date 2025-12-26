"use client";

import { Calendar, User } from "lucide-react";
import Image from "next/image";

import { useBuilderStore } from "@/builder/state/builder-store";
import { registerStyle } from "@/builder/utils/style-registry";
import imageLoader from "@/lib/image-loader";

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
        fontFamily,
        titleFontSize,
        titleFontWeight,
        bodyFontSize,
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
    } = useBuilderStore();

    const getFontFamilyValue = () => {
        switch (fontFamily) {
            case "serif":
                return "serif";
            case "sans-serif":
                return "sans-serif";
            case "monospace":
                return "monospace";
            default:
                return "inherit";
        }
    };

    const getShadowValue = () => {
        switch (shadow) {
            case "none":
                return "none";
            case "sm":
                return "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)";
            case "md":
                return "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)";
            case "lg":
                return "0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)";
            default:
                return "none";
        }
    };

    const cardClass = registerStyle({
        backgroundColor,
        border: showBorder ? `${borderWidth}px solid ${borderColor}` : "none",
        borderRadius: `${borderRadius.value}${borderRadius.unit}`,
        boxShadow: getShadowValue(),
        color: textColor,
        fontFamily: getFontFamilyValue(),
        maxWidth: "32rem",
        overflow: "hidden",
        padding: `${padding.value}${padding.unit}`,
        position: "relative",
        transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    });

    const titleClass = registerStyle({
        fontSize: `${titleFontSize}px`,
        fontWeight: titleFontWeight,
        letterSpacing: "-0.01em",
        lineHeight: "1.3",
        marginBottom: "0.75rem",
    });

    const bodyClass = registerStyle({
        fontSize: `${bodyFontSize}px`,
        letterSpacing: "0.01em",
        lineHeight: "1.7",
        opacity: 0.85,
    });

    const subtitleClass = registerStyle({
        fontSize: `${Math.max(12, bodyFontSize - 2)}px`,
        fontWeight: 500,
        letterSpacing: "0.02em",
        lineHeight: "1.5",
        marginBottom: "0.5rem",
        opacity: 0.7,
        textTransform: "uppercase",
    });

    const metaClass = registerStyle({
        alignItems: "center",
        display: "flex",
        fontSize: `${Math.max(11, bodyFontSize - 3)}px`,
        gap: "0.5rem",
        opacity: 0.65,
    });

    const tagClass = registerStyle({
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: "9999px",
        display: "inline-block",
        fontSize: `${Math.max(11, bodyFontSize - 3)}px`,
        marginRight: "0.5rem",
        marginTop: "0.5rem",
        opacity: 0.75,
        padding: "0.25rem 0.75rem",
    });

    const buttonClass = registerStyle({
        backgroundColor: textColor,
        border: "none",
        borderRadius: "8px",
        color: backgroundColor,
        cursor: "pointer",
        display: "inline-block",
        fontSize: `${Math.max(13, bodyFontSize - 1)}px`,
        fontWeight: 600,
        marginTop: "1rem",
        padding: "0.75rem 1.5rem",
        textDecoration: "none",
        transition: "all 200ms ease",
    });

    const imageClass = registerStyle({
        borderRadius: "8px",
        display: "block",
        height: "250px",
        marginBottom: "1rem",
        objectFit: "cover",
        width: `100%`,
    });

    const tagsArray = tags
        .split(",")
        .map(tag => {
            return tag.trim();
        })
        .filter(Boolean);

    return (
        <>
            <div className={cardClass}>
                {showImage && imageUrl && (
                    <Image
                        alt={title}
                        className={imageClass}
                        height={250}
                        loader={imageLoader}
                        src={imageUrl || ""}
                        width={800}
                    />
                )}
                {subtitle && <div className={subtitleClass}>{subtitle}</div>}

                <h4 className={titleClass}>{title}</h4>

                {(author || date) && (
                    <div className={metaClass} style={{ flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                        {author && (
                            <div style={{ alignItems: "center", display: "flex", gap: "0.375rem" }}>
                                <User style={{ height: "14px", width: "14px" }} />
                                <span>{author}</span>
                            </div>
                        )}
                        {date && (
                            <div style={{ alignItems: "center", display: "flex", gap: "0.375rem" }}>
                                <Calendar style={{ height: "14px", width: "14px" }} />
                                <span>{date}</span>
                            </div>
                        )}
                    </div>
                )}

                {description && <p className={bodyClass}>{description}</p>}

                {tagsArray.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                        {tagsArray.map((tag, index) => {
                            return (
                                <span className={tagClass} key={index}>
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                )}

                {showButton && buttonText && (
                    <a className={buttonClass} href={buttonLink} style={{ display: "inline-block" }}>
                        {buttonText}
                    </a>
                )}
            </div>
        </>
    );
}
