import { create } from "zustand";

import { defaultCardStyles } from "../config/default-theme";
import type {
    BackgroundColor,
    BorderColor,
    BorderRadius,
    BorderWidth,
    CardStyleClasses,
    FontSize,
    FontWeight,
    Padding,
    Shadow,
    TextColor,
} from "../utils/class-generator";

type CardStyleState = CardStyleClasses & {
    setBackgroundColor: (value: BackgroundColor) => void;
    setTextColor: (value: TextColor) => void;
    setBorderRadius: (value: BorderRadius) => void;
    setPadding: (value: Padding) => void;
    setShadow: (value: Shadow) => void;
    setBorderWidth: (value: BorderWidth) => void;
    setBorderColor: (value: BorderColor) => void;
    setTitleFontSize: (value: FontSize) => void;
    setTitleFontWeight: (value: FontWeight) => void;
    setBodyFontSize: (value: FontSize) => void;
    setShowBorder: (value: boolean) => void;
};

export const useBuilderStore = create<CardStyleState>(set => {
    return {
        ...defaultCardStyles,
        setBackgroundColor: value => {
            return set({ backgroundColor: value });
        },
        setBodyFontSize: value => {
            return set({ bodyFontSize: value });
        },
        setBorderColor: value => {
            return set({ borderColor: value });
        },
        setBorderRadius: value => {
            return set({ borderRadius: value });
        },
        setBorderWidth: value => {
            return set({ borderWidth: value });
        },
        setPadding: value => {
            return set({ padding: value });
        },
        setShadow: value => {
            return set({ shadow: value });
        },
        setShowBorder: value => {
            return set({ showBorder: value });
        },
        setTextColor: value => {
            return set({ textColor: value });
        },
        setTitleFontSize: value => {
            return set({ titleFontSize: value });
        },
        setTitleFontWeight: value => {
            return set({ titleFontWeight: value });
        },
    };
});
