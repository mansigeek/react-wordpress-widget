import { cn } from "@/lib/utils";

export type BackgroundColor =
    | "white"
    | "gray-50"
    | "gray-100"
    | "blue-50"
    | "green-50"
    | "red-50"
    | "yellow-50"
    | "purple-50";
export type TextColor = "gray-900" | "gray-800" | "gray-700" | "blue-900" | "green-900" | "red-900" | "black" | "white";
export type BorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
export type Padding = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type Shadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
export type BorderWidth = "none" | "thin" | "medium" | "thick";
export type BorderColor = "gray-200" | "gray-300" | "blue-200" | "green-200" | "red-200" | "purple-200" | "transparent";
export type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
export type FontWeight = "normal" | "medium" | "semibold" | "bold";

export interface CardStyleClasses {
    backgroundColor: BackgroundColor;
    textColor: TextColor;
    borderRadius: BorderRadius;
    padding: Padding;
    shadow: Shadow;
    borderWidth: BorderWidth;
    borderColor: BorderColor;
    titleFontSize: FontSize;
    titleFontWeight: FontWeight;
    bodyFontSize: FontSize;
    showBorder: boolean;
}

export function generateCardClasses(styles: CardStyleClasses): string {
    const classes = [
        // Background
        styles.backgroundColor === "white" ? "bg-white" : "",
        styles.backgroundColor === "gray-50" ? "bg-gray-50" : "",
        styles.backgroundColor === "gray-100" ? "bg-gray-100" : "",
        styles.backgroundColor === "blue-50" ? "bg-blue-50" : "",
        styles.backgroundColor === "green-50" ? "bg-green-50" : "",
        styles.backgroundColor === "red-50" ? "bg-red-50" : "",
        styles.backgroundColor === "yellow-50" ? "bg-yellow-50" : "",
        styles.backgroundColor === "purple-50" ? "bg-purple-50" : "",

        // Text Color
        styles.textColor === "gray-900" ? "text-gray-900" : "",
        styles.textColor === "gray-800" ? "text-gray-800" : "",
        styles.textColor === "gray-700" ? "text-gray-700" : "",
        styles.textColor === "blue-900" ? "text-blue-900" : "",
        styles.textColor === "green-900" ? "text-green-900" : "",
        styles.textColor === "red-900" ? "text-red-900" : "",
        styles.textColor === "black" ? "text-black" : "",
        styles.textColor === "white" ? "text-white" : "",

        // Border Radius
        styles.borderRadius === "none" ? "rounded-none" : "",
        styles.borderRadius === "sm" ? "rounded-sm" : "",
        styles.borderRadius === "md" ? "rounded-md" : "",
        styles.borderRadius === "lg" ? "rounded-lg" : "",
        styles.borderRadius === "xl" ? "rounded-xl" : "",
        styles.borderRadius === "2xl" ? "rounded-2xl" : "",
        styles.borderRadius === "3xl" ? "rounded-3xl" : "",
        styles.borderRadius === "full" ? "rounded-full" : "",

        // Padding
        styles.padding === "none" ? "p-0" : "",
        styles.padding === "sm" ? "p-2" : "",
        styles.padding === "md" ? "p-4" : "",
        styles.padding === "lg" ? "p-6" : "",
        styles.padding === "xl" ? "p-8" : "",
        styles.padding === "2xl" ? "p-10" : "",
        styles.padding === "3xl" ? "p-12" : "",
        styles.padding === "4xl" ? "p-16" : "",

        // Shadow
        styles.shadow === "none" ? "" : "",
        styles.shadow === "sm" ? "shadow-sm" : "",
        styles.shadow === "md" ? "shadow-md" : "",
        styles.shadow === "lg" ? "shadow-lg" : "",
        styles.shadow === "xl" ? "shadow-xl" : "",
        styles.shadow === "2xl" ? "shadow-2xl" : "",

        // Border
        styles.showBorder ? "" : "border-0",
        styles.showBorder && styles.borderWidth === "thin" ? "border" : "",
        styles.showBorder && styles.borderWidth === "medium" ? "border-2" : "",
        styles.showBorder && styles.borderWidth === "thick" ? "border-4" : "",
        styles.showBorder && styles.borderColor === "gray-200" ? "border-gray-200" : "",
        styles.showBorder && styles.borderColor === "gray-300" ? "border-gray-300" : "",
        styles.showBorder && styles.borderColor === "blue-200" ? "border-blue-200" : "",
        styles.showBorder && styles.borderColor === "green-200" ? "border-green-200" : "",
        styles.showBorder && styles.borderColor === "red-200" ? "border-red-200" : "",
        styles.showBorder && styles.borderColor === "purple-200" ? "border-purple-200" : "",
        styles.showBorder && styles.borderColor === "transparent" ? "border-transparent" : "",

        // Base classes
        "transition-all",
        "w-full",
        "max-w-md",
    ];

    return cn(...classes);
}

export function generateTitleClasses(styles: CardStyleClasses): string {
    return cn(
        "mb-2",
        styles.titleFontSize === "xs" ? "text-xs" : "",
        styles.titleFontSize === "sm" ? "text-sm" : "",
        styles.titleFontSize === "base" ? "text-base" : "",
        styles.titleFontSize === "lg" ? "text-lg" : "",
        styles.titleFontSize === "xl" ? "text-xl" : "",
        styles.titleFontSize === "2xl" ? "text-2xl" : "",
        styles.titleFontWeight === "normal" ? "font-normal" : "",
        styles.titleFontWeight === "medium" ? "font-medium" : "",
        styles.titleFontWeight === "semibold" ? "font-semibold" : "",
        styles.titleFontWeight === "bold" ? "font-bold" : "",
    );
}

export function generateBodyClasses(styles: CardStyleClasses): string {
    return cn(
        "leading-relaxed",
        "opacity-90",
        styles.bodyFontSize === "xs" ? "text-xs" : "",
        styles.bodyFontSize === "sm" ? "text-sm" : "",
        styles.bodyFontSize === "base" ? "text-base" : "",
        styles.bodyFontSize === "lg" ? "text-lg" : "",
        styles.bodyFontSize === "xl" ? "text-xl" : "",
        styles.bodyFontSize === "2xl" ? "text-2xl" : "",
    );
}
