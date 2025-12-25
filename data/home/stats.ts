import { Code, Package, Zap } from "lucide-react";

export interface Stat {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}

export const stats: Stat[] = [
    { icon: Package, label: "Production Packages", value: "24" },
    { icon: Code, label: "Dev Dependencies", value: "31" },
    { icon: Zap, label: "Total Packages", value: "55" },
];
