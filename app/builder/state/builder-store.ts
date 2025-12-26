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
    fontFamily: "default" | "serif" | "sans-serif" | "monospace";
    titleFontSize: number;
    titleFontWeight: number;
    bodyFontSize: number;

    /* Content */
    title: string;
    subtitle: string;
    description: string;
    author: string;
    date: string;
    tags: string;
    imageUrl: string;
    showImage: boolean;
    buttonText: string;
    buttonLink: string;
    showButton: boolean;

    /* Actions */
    setBackgroundColor: (value: string) => void;
    setTextColor: (value: string) => void;

    setPadding: (value: LengthValue) => void;
    setBorderRadius: (value: LengthValue) => void;

    setShadow: (value: CardStyleState["shadow"]) => void;

    setShowBorder: (value: boolean) => void;
    setBorderWidth: (value: number) => void;
    setBorderColor: (value: string) => void;

    setFontFamily: (value: CardStyleState["fontFamily"]) => void;
    setTitleFontSize: (value: number) => void;
    setTitleFontWeight: (value: number) => void;
    setBodyFontSize: (value: number) => void;

    setTitle: (value: string) => void;
    setSubtitle: (value: string) => void;
    setDescription: (value: string) => void;
    setAuthor: (value: string) => void;
    setDate: (value: string) => void;
    setTags: (value: string) => void;
    setImageUrl: (value: string) => void;
    setShowImage: (value: boolean) => void;
    setButtonText: (value: string) => void;
    setButtonLink: (value: string) => void;
    setShowButton: (value: boolean) => void;
}

export const useBuilderStore = create<CardStyleState>(set => {
    return {
        author: "John Doe",
        backgroundColor: "#ffffff",
        bodyFontSize: 14,
        borderColor: "#e5e7eb",
        borderRadius: { unit: "px", value: 16 },
        borderWidth: 1,
        buttonLink: "#",
        buttonText: "Learn More",
        date: "March 15, 2024",
        description:
            "This is a premium card component with customizable content. You can edit all fields including title, subtitle, description, author information, date, tags, and call-to-action button.",

        fontFamily: "default",

        imageUrl:
            "https://images.unsplash.com/photo-1551290470-554bf3a4fa80?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        padding: { unit: "px", value: 24 },

        setAuthor: author => {
            return set({ author });
        },

        /* Actions */
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

        setButtonLink: buttonLink => {
            return set({ buttonLink });
        },

        setButtonText: buttonText => {
            return set({ buttonText });
        },

        setDate: date => {
            return set({ date });
        },

        setDescription: description => {
            return set({ description });
        },

        setFontFamily: fontFamily => {
            return set({ fontFamily });
        },

        setImageUrl: imageUrl => {
            return set({ imageUrl });
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

        setShowButton: showButton => {
            return set({ showButton });
        },

        setShowImage: showImage => {
            return set({ showImage });
        },

        setSubtitle: subtitle => {
            return set({ subtitle });
        },

        setTags: tags => {
            return set({ tags });
        },

        setTextColor: textColor => {
            return set({ textColor });
        },

        setTitle: title => {
            return set({ title });
        },

        setTitleFontSize: titleFontSize => {
            return set({ titleFontSize });
        },

        setTitleFontWeight: titleFontWeight => {
            return set({ titleFontWeight });
        },

        shadow: "md",

        showBorder: false,

        showButton: true,

        showImage: true,

        subtitle: "Beautiful & Modern Design",

        tags: "Design, Premium, Modern",

        textColor: "#111827",
        /* Content defaults */
        title: "Premium Card Title",
        titleFontSize: 24,
        titleFontWeight: 700,
    };
});
