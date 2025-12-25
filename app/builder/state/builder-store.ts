import { create } from "zustand";

type CardStyleState = {
    bgColor: string;
    textColor: string;
    radius: number;
    padding: number;
    fontSize: number;
    setBgColor: (value: string) => void;
    setTextColor: (value: string) => void;
    setRadius: (value: number) => void;
    setPadding: (value: number) => void;
    setFontSize: (value: number) => void;
};

export const useBuilderStore = create<CardStyleState>(set => {
    return {
        bgColor: "#ffffff",
        fontSize: 16,
        padding: 16,
        radius: 12,
        setBgColor: value => {
            return set({ bgColor: value });
        },

        setFontSize: value => {
            return set({ fontSize: value });
        },
        setPadding: value => {
            return set({ padding: value });
        },
        setRadius: value => {
            return set({ radius: value });
        },
        setTextColor: value => {
            return set({ textColor: value });
        },
        textColor: "#111827",
    };
});
