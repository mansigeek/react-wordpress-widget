import { create } from "zustand";

type CardStyleState = {
    bgColor: string;
    textColor: string;
    radius: number;
    padding: number;

    setBgColor: (value: string) => void;
    setTextColor: (value: string) => void;
    setRadius: (value: number) => void;
    setPadding: (value: number) => void;
};

export const useBuilderStore = create<CardStyleState>(set => {
    return {
        bgColor: "#ffffff",
        padding: 16,
        radius: 12,
        setBgColor: value => {
            return set({ bgColor: value });
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
