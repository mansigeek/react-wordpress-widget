import { create } from "zustand";

/* ----------------------------------
   Types
---------------------------------- */

type Unit = "px" | "rem";

interface LengthValue {
    value: number;
    unit: Unit;
}

interface CardStyleState {
    /* Colors */
    backgroundColor: string;
    textColor: string;

    /* Spacing & shape */
    padding: LengthValue;
    borderRadius: LengthValue;

    /* Shadow */
    shadow: "none" | "sm" | "md" | "lg";

    /* Border */
    showBorder: boolean;
    borderWidth: number;
    borderColor: string;

    /* Typography */
    titleFontSize: number;
    titleFontWeight: number;
    bodyFontSize: number;

    /* Actions */
    setBackgroundColor: (value: string) => void;
    setTextColor: (value: string) => void;

    setPadding: (value: LengthValue) => void;
    setBorderRadius: (value: LengthValue) => void;

    setShadow: (value: CardStyleState["shadow"]) => void;

    setShowBorder: (value: boolean) => void;
    setBorderWidth: (value: number) => void;
    setBorderColor: (value: string) => void;

    setTitleFontSize: (value: number) => void;
    setTitleFontWeight: (value: number) => void;
    setBodyFontSize: (value: number) => void;
}

export const useBuilderStore = create<CardStyleState>(set => {
    return {
        backgroundColor: "#f3f4f6",
        bodyFontSize: 14,
        borderColor: "#e5e7eb",
        borderRadius: { unit: "px", value: 12 },
        borderWidth: 1,
        padding: { unit: "px", value: 16 },
        setBackgroundColor: backgroundColor => {
            return set({ backgroundColor });
        },
        setBodyFontSize: bodyFontSize => {
            return set({ bodyFontSize });
        },
        setBorderColor: borderColor => {
            return set({ borderColor });
        },
        setBorderRadius: borderRadius => {
            return set({ borderRadius });
        },
        setBorderWidth: borderWidth => {
            return set({ borderWidth });
        },
        setPadding: padding => {
            return set({ padding });
        },
        setShadow: shadow => {
            return set({ shadow });
        },
        setShowBorder: showBorder => {
            return set({ showBorder });
        },
        setTextColor: textColor => {
            return set({ textColor });
        },
        setTitleFontSize: titleFontSize => {
            return set({ titleFontSize });
        },
        setTitleFontWeight: titleFontWeight => {
            return set({ titleFontWeight });
        },
        shadow: "sm",
        showBorder: false,
        textColor: "#111827",
        titleFontSize: 18,
        titleFontWeight: 600,
    };
});
