export interface PackageItem {
    category: string;
    description: string;
    name: string;
    npmUrl: string;
    type: "dependency" | "devDependency";
    version: string;
}

export const categories = [
    "Core Framework",
    "UI Components",
    "Data Fetching & State",
    "Forms & Validation",
    "Authentication",
    "Performance & Optimization",
    "Charts & Visualization",
    "Styling",
    "TypeScript",
    "Linting & Code Quality",
    "Style Linting",
    "Formatting",
    "Git Hooks",
    "Testing",
    "Tailwind CSS",
] as const;
