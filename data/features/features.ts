import {
    BarChart3,
    Code,
    Database,
    FormInput,
    GitBranch,
    Layers,
    Lock,
    Palette,
    Shield,
    TestTube,
    Zap,
} from "lucide-react";

export interface Feature {
    color: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    items: string[];
    title: string;
}

export const features: Feature[] = [
    {
        color: "text-yellow-400",
        description: "Cutting-edge technologies for building scalable applications",
        icon: Zap,
        items: ["Next.js 16.1.1", "React 19.2.3", "TypeScript 5", "App Router"],
        title: "Modern Stack",
    },
    {
        color: "text-purple-400",
        description: "Beautiful, accessible, and customizable UI components",
        icon: Palette,
        items: ["Radix UI Primitives", "Tailwind CSS 4", "Lucide Icons", "Embla Carousel", "Class Variance Authority"],
        title: "UI Components",
    },
    {
        color: "text-blue-400",
        description: "Flexible state management solutions for any use case",
        icon: Database,
        items: ["React Query (Server State)", "Zustand (Client State)", "React Context API"],
        title: "State Management",
    },
    {
        color: "text-green-400",
        description: "Powerful form handling with type-safe validation",
        icon: FormInput,
        items: ["React Hook Form", "Zod Schema Validation", "Type-safe Forms"],
        title: "Forms & Validation",
    },
    {
        color: "text-red-400",
        description: "Complete authentication solution ready to use",
        icon: Lock,
        items: ["NextAuth.js", "Multiple Providers", "Session Management"],
        title: "Authentication",
    },
    {
        color: "text-orange-400",
        description: "Optimized for speed and user experience",
        icon: Zap,
        items: [
            "Image Optimization (Sharp)",
            "Blur Placeholders (Plaiceholder)",
            "Virtualized Lists (React Virtuoso)",
            "Progress Indicators",
        ],
        title: "Performance",
    },
    {
        color: "text-pink-400",
        description: "Beautiful charts and graphs for your data",
        icon: BarChart3,
        items: ["Recharts", "Composable Charts", "Responsive Design"],
        title: "Data Visualization",
    },
    {
        color: "text-emerald-400",
        description: "Comprehensive tooling for maintaining code quality",
        icon: Shield,
        items: [
            "ESLint with Next.js Config",
            "Prettier Code Formatting",
            "Stylelint for CSS",
            "TypeScript Strict Mode",
        ],
        title: "Code Quality",
    },
    {
        color: "text-cyan-400",
        description: "Automated quality checks before commits",
        icon: GitBranch,
        items: ["Husky Git Hooks", "Lint-staged", "Pre-commit Checks"],
        title: "Git Hooks",
    },
    {
        color: "text-indigo-400",
        description: "End-to-end testing framework included",
        icon: TestTube,
        items: ["Playwright", "Cross-browser Testing", "E2E Test Setup"],
        title: "Testing",
    },
    {
        color: "text-violet-400",
        description: "Tools and configurations for smooth development",
        icon: Code,
        items: ["Hot Module Replacement", "TypeScript IntelliSense", "Import Organization", "Auto-formatting"],
        title: "Developer Experience",
    },
    {
        color: "text-teal-400",
        description: "Modern CSS processing and utilities",
        icon: Layers,
        items: ["PostCSS", "Autoprefixer", "CSS Custom Properties", "Dark Mode Support"],
        title: "Styling System",
    },
];
