import { Database, Palette, Shield, Zap } from "lucide-react";

export interface HomeFeature {
    color: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
}

export const features: HomeFeature[] = [
    {
        color: "text-yellow-400",
        description: "Next.js 16, React 19, TypeScript 5",
        icon: Zap,
        title: "Modern Stack",
    },
    {
        color: "text-purple-400",
        description: "Radix UI, Tailwind CSS, Lucide Icons",
        icon: Palette,
        title: "UI Components",
    },
    {
        color: "text-blue-400",
        description: "React Query, Zustand, React Hook Form",
        icon: Database,
        title: "State Management",
    },
    {
        color: "text-green-400",
        description: "ESLint, Prettier, Stylelint, Husky",
        icon: Shield,
        title: "Code Quality",
    },
];
